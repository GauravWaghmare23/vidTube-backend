import app from "./app.js";
import connectDb from "./db/index.js";
import dotenv from 'dotenv';


dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 3000;

connectDb()
.then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
})
.catch((err)=>{
    console.log("mongoDb connection error : ",err)
})