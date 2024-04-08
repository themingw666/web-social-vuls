import express  from "express";
import * as settingController from "../controller/settingControllers.js"
const Route = express.Router()

Route.get("/",settingController.getSettingPage)

export default Route