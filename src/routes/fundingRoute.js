import express from "express";
const Route = express.Router()
import fundingController from "../controller/fundingControllers.js"

Route.get("/",fundingController.getFundingPage)

export default Route