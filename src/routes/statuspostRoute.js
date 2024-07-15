import express from "express";
const Route = express.Router()
import statuspostController from "../controller/statuspostControllers.js"

Route.get("/file/:id?",statuspostController.documentfile)
Route.get("/:id?",statuspostController.getStatusPage)

export default Route