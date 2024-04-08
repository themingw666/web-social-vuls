import express  from "express";
import * as event2Controller from "../controller/event2Controllers.js"

const Route  = express.Router()
Route.get("/",event2Controller.getEvent2Page)

export default Route
