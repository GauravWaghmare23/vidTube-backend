import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)


// common middlewares
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser())

// import routes
import healthCheckRouter from './routes/healthCheck.routes.js'
import registerUserRouter from './routes/user.routes.js'
import { errorHandler } from './middlewares/error.middlewares.js';

// routes
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users",registerUserRouter)


app.use(errorHandler)
export default app
