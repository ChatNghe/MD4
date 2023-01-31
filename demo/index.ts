import express from 'express';
import {router} from "./src/router/router";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload'
import mongoose from "mongoose";
import session from "express-session"
import cors from 'cors'
import {AppDataSource} from "./src/data-source";

const app = express();

AppDataSource.initialize().then(()=>{
    console.log('Connect db success!')
})


app.use(cors());
app.use(fileUpload({
    createParentPath: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }}));
app.use('',router)
app.listen(3000, ()=>{
    console.log('Server is running')
})