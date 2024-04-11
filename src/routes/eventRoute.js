import express from "express";
const Route = express.Router()
import eventControllers from "../controller/eventControllers.js"
Route.get("/",eventControllers.getEventPage)

export default Route