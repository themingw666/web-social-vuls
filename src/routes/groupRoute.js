import express from "express";
const Route = express.Router()
import groupController from "../controller/groupControllers.js"

Route.get('/',groupController.getGroupPage)

export default Route