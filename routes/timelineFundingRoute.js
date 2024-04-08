import express  from "express";
import * as timelineFundingController from "../controller/timelineFundingControllers.js"
const Route = express.Router()

Route.get('/',timelineFundingController.getTimelineFundingPage)

export default Route