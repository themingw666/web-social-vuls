import express from "express";
import * as timelinePageController from "../controller/timelinePageControllers.js"

const Route = express.Router()

Route.get('/',timelinePageController.getTimeLinePage)

export default Route