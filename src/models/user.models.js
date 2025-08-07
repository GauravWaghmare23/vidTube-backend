import mongoose, { Schema } from "mongoose";
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    avatar: {
      type: String, // Cloudinary URL
    },
    coverImage: {
      type: String, // Cloudinary URL
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function(next){
  if (!this.isModified("password")) return next();
  this.password = bycrpt.hash(this.password,10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bycrpt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
  jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    email:this.email
  },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn:process.env.ACCESS_TOKEN_EXPIRE}
)
}

userSchema.methods.generateRefreshToken = function(){
  jwt.sign({
    _id:this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn:process.env.REFRESH_TOKEN_EXPIRE}
)
}

export const User = mongoose.model("User", userSchema);
