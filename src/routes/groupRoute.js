import express from "express";
const Route = express.Router()
import * as groupController from "../controller/groupControllers.js"

Route.get('/',groupController.getGroupPage)

export default Route