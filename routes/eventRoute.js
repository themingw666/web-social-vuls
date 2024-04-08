import express from "express";
const Route = express.Router()
import * as eventControllers from "../controller/eventControllers.js"
Route.get("/",eventControllers.getEventPage)

export default Route