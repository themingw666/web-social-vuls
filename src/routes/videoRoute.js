import express  from "express";
const Route = express.Router()
import videoController from "../controller/videoControllers.js"

Route.get("/",videoController.getVideoPage)

export default Route

