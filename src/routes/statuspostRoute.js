import express from "express";
const Route = express.Router()
import statuspostController from "../controller/statuspostControllers.js"

Route.get("/",statuspostController.getStatusPage)

export default Route