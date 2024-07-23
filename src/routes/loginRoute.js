import express from "express";
import loginController from "../controller/loginControllers.js"
const Route = express.Router()
import session from 'express-session'

Route.use(session({
    secret: '666666',
    resave: false,
    saveUninitialized: true,
}));

Route.get("/captcha", loginController.captcha)
Route.get("/", loginController.getLoginPage)
Route.post("/",loginController.handleLogin)

export default Route