import express from "express";
const Route = express.Router()
import * as marketController from "../controller/marketControllers.js"

Route.get("/",marketController.getmarketPage)
export default Route
