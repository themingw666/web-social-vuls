import express from "express";
const Route = express.Router()
import blogController from "../controller/blogControllers.js"

Route.get('/',blogController.getBlogPage)

export default Route