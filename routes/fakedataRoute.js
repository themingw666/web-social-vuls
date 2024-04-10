import express  from "express";
import * as fakedataController from "../controller/fakedataControllers.js"

const Route = express.Router()

Route.get("/",fakedataController.getFakedata)

export default Route