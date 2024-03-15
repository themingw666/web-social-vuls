import express  from "express";
import * as upgradeController from "../controller/upgradeControllers.js"

const Route = express.Router()

Route.get("/",upgradeController.getUpgradePage)

export default Route