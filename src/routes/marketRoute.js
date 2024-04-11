import express from "express";
const Route = express.Router()
import marketController from "../controller/marketControllers.js"

Route.get("/",marketController.getmarketPage)
export default Route
