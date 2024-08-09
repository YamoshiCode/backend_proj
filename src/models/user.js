import dotenv from 'dotenv';
import mongoose, { mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { Video } from "./video";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


dotenv.config();

const userschema = new mongoose.Schema({
    watchHistory : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Video" 
    }] ,
    username : {
        type : String,
        required : true,
        unique : true,
        index : true,
        lowercase : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullName : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String,
        required : true,
        trim : true
    },
    coverImage : {
        type : String
    },
    password : {
        type : String,
        required : [true , 'password is required']
    },
    refreshToken : {
        type : String
    },
},{timestamps : true})
userschema.plugin(mongooseAggregatePaginate);

userschema.pre('save', function(next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next();
  });

userschema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password , this.password)
}

userschema.methods.generateAcessToken = function () {
    return jwt.sign(
        {
            _id : this._id ,
            email : this.email ,
            username: this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}


userschema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id ,
            email : this.email ,
            username: this.username,
            fullName : this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}
export const User = mongoose.Model("User", userschema)