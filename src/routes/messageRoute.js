import express from "express";
import messageController from "../controller/messageControllers.js"
const Route = express.Router()

Route.get("/",messageController.getMessagePage)
Route.post("/",messageController.getMessage)
export default Route

