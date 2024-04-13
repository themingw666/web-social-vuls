import express  from "express";
import settingVulController from "../controller/settingvulControllers.js"
const Route = express.Router()

Route.put("/submit", settingVulController.submit)
Route.get("/", settingVulController.setting)

export default Route