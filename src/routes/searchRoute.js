import express  from "express";
import searchController from "../controller/searchControllers.js"

const Route =  express.Router()
Route.get('/', searchController.search)

export default Route