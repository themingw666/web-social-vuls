import express from "express";
const Route = express.Router()
import  pageController from "../controller/pageControllers.js"

Route.get("/",pageController.getPage)

export default Route