// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js';




dotenv.config({
    path: './.env'
})



connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000,() => {
        console.log(`Server is running at Port: ${process.env.PORT}`)
    } )
})
.catch((err) => {
    console.log("MONGODB connection failed!!",err);
}) 




// 1st Approch to connect db

// import mongoose, { connect } from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";
// const app = express()

// // Basic syntax 
// // function_call(){
// //     console.log("abc")
// // }
// // function_call()

// // ife function  => ()()

// (async() => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME} `)
//         app.on("error", (error) => {
//             console.log("ERROR: " , error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => { 
//             console.log(`App is listening to port ${process.env.PORT}`);
//         })

//     }catch(err){
//         console.error("Error",err)
//         throw err
//     }
// }) ()