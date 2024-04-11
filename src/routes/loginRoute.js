import express from "express";
import loginController from "../controller/loginControllers.js"

const Route = express.Router()

Route.get("/",loginController.getLoginPage)
Route.post("/",(req,res) =>{
    console.log(req.body)
    res.send('ok')
})

export default Route