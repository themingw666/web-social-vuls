import express from "express";
const Route = express.Router()
import registerController from "../controller/registerControllers.js"

const dataMiddleware = (req, res, next) => {
    if (req.body.email) {
        req.session.email = req.body.email
    }
    next();
};

Route.post("/check-data",registerController.checkdata)
Route.get("/checkout", dataMiddleware, registerController.checkout)
Route.get("/",registerController.getRegisterPage)
Route.post("/", dataMiddleware, registerController.handleRegister)

export default Route