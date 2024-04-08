import express from "express";
import * as blogReadController from "../controller/blogReadControllers.js"

const Route = express.Router()
 Route.get('/',blogReadController.getBlogReadPage)

 export default Route