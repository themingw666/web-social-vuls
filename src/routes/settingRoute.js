import express  from "express";
import settingController from "../controller/settingControllers.js"
const Route = express.Router()

Route.post("/info",settingController.postinfoPage)
Route.post("/passwd",settingController.postpasswdPage)
Route.get("/",settingController.getSettingPage)

export default Route