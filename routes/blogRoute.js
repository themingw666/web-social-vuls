import express from "express";
const Route = express.Router()
import * as blogController from "../controller/blogControllers.js"

Route.get('/',blogController.getBlogPage)

export default Route