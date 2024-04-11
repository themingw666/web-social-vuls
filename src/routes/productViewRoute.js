import express  from "express";
import productViewController from "../controller/productViewControllers.js"

const Route =  express.Router()
Route.get('/',productViewController.getProductView)

export default Route