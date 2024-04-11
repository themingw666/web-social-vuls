import express  from "express";
import  timlineController from "../controller/timelineControllers.js"
const Route = express.Router()

Route.get("/",timlineController.getTimelinePage)

export default Route