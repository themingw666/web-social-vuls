import express  from "express";
import * as  productViewController from "../controller/productViewControllers.js"

const Route =  express.Router()
Route.get('/',productViewController.getProductView)

export default Route