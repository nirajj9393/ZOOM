import express from "express";
import {createServer} from "node:http";


import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';   

import connectToSocket from "./src/controller/socketManager.js";
import UserRouter from "./src/router/user.router.js";
dotenv.config(); 
const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 3000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",UserRouter);
app.get("/", (req, res) => {
  res.send("Hello Niraj Bhai!");
});

const start = async () =>{
    const connectToDb = await mongoose.connect(process.env.DB_URL);
    console.log("connected to db....")
    server.listen(app.get("port"),()=>{
    console.log(`server is running on the port: ${process.env.PORT}`);

    })
}
start();