import express from "express";
import loginController from "../controller/loginControllers.js"

const Route = express.Router()

Route.get("/",loginController.getLoginPage)

Route.post("/",loginController.handleLogin)

export default Route