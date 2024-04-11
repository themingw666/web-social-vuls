import express from "express";
const Route = express.Router()
import gameController from "../controller/gameControllers.js"

Route.get('/',gameController.getGamePage)

export default Route