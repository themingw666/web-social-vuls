import express from "express";
import componentController from "../controller/componentControllers.js"

const Route = express.Router()
Route.get("/",componentController.getComponentPage)

export default Route