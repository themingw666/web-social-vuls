import express  from "express";
import settingController from "../controller/settingControllers.js"
const Route = express.Router()

Route.get("/",settingController.getSettingPage)

export default Route