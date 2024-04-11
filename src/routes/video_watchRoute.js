import express  from "express";
import videoWatchController from "../controller/video_watchControllers.js"
const Route = express.Router()

Route.get("/",videoWatchController.getVideo)

export default Route