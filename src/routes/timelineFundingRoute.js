import express  from "express";
import timelineFundingController from "../controller/timelineFundingControllers.js"
const Route = express.Router()

Route.get('/',timelineFundingController.getTimelineFundingPage)

export default Route