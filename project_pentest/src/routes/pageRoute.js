import express from "express";
const Route = express.Router()
import * as pageController from "../controller/pageControllers.js"

Route.get("/",pageController.getPage)

export default Route