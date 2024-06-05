import express from "express"
const Route = express.Router()
import homeController from "../controller/homeControllers.js"

Route.get("/",homeController.getHomePage)
Route.post("/",homeController.handleHome)

export default Route