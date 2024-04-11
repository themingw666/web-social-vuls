import express from "express";
import timelineGroupController from "../controller/timelineGroupControllers.js"

const Route = express.Router()

Route.get('/',timelineGroupController.getTimeLineGroupPage)

export default Route