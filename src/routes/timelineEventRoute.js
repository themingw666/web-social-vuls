import express from "express";
import timelineEventController from "../controller/timelineEventControllers.js"

const Route = express.Router()

Route.get('/',timelineEventController.getTimeLineEventPage)

export default Route