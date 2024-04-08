import express from "express";
import * as group2Controller from "../controller/group2Controllers.js"
const Route = express.Router()
Route.get("/",group2Controller.getGroup2Page)

export default Route