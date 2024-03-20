import express from "express";
const Route = express.Router()
import * as fundingController from "../controller/fundingControllers.js"

Route.get("/",fundingController.getFundingPage)

export default Route