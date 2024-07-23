import express from "express";
const Route = express.Router()
import captchaController from "../controller/captchaControllers.js"

Route.get("/",captchaController.index)

export default Route