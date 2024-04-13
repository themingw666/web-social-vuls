import express  from "express";
import settingVulController from "../controller/settingvulControllers.js"
const Route = express.Router()

Route.get("/",settingVulController.setting)

export default Route