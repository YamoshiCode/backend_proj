import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env",
})
connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000, ()=>  {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    })
}

)
.catch((err) => {
    console.error(err);
    })
/*
import express from "express"

app = express()
(async () => {
    try {
      await  mongoose.connect(`${process.env.MONGODB_URL}
            / ${DB_NAME}
            `)
            app.on("error",(error)=> {
                console.error("error : ",error)
        throw err
            })
            app.listen(process.env.PORT, () => {
                console.log(`server is running on port ${process.env.PORT}`)
                })


    } catch(error) {
        console.error("error : ",error)
        throw err
    }
})()
    */