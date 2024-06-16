import express from "express";
import commentpostController from "../controller/commentpostControllers.js"
const Route = express.Router()

Route.post("/",commentpostController.handleComment)

export default Route