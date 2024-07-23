import express from "express";
import loginController from "../controller/loginControllers.js"
const Route = express.Router()

Route.post("/check-data", loginController.check)
Route.get("/", loginController.getLoginPage)
Route.post("/",loginController.handleLogin)

export default Route