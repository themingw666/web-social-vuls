import express from "express";
import exportController from "../controller/exportControllers.js"
const Route = express.Router()

Route.get("/",exportController.getPdfPage)

export default Route