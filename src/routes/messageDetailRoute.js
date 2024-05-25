import express from "express"
import messageControllers from "../controller/messageControllers.js"
const Route = express.Router()

Route.get('/:receiveID',messageControllers.getchat )

export default Route