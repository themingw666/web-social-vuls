import express from "express";
const Route = express.Router()
import * as gameController from "../controller/gameControllers.js"

Route.get('/',gameController.getGamePage)

export default Route