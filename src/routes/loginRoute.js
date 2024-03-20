import express from "express";
import * as loginController from "../controller/loginControllers.js"
const Route = express.Router()

Route.get("/",loginController.getLoginPage)

export default Route