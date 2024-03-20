import express from "express";
import * as blog2Controller from "../controller/blog2Controllers.js"
const Route = express.Router()

Route.get("/",blog2Controller.getBlog2Page)

export default Route