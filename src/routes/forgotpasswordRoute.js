import express from "express";
const Route = express.Router()
import forgotpasswordController from "../controller/forgotpasswordControllers.js"

Route.get('/vertify',forgotpasswordController.vertify)
Route.get('/reset',forgotpasswordController.reset)
Route.get('/',forgotpasswordController.index)

export default Route