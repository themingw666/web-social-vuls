import express from "express";
const Route = express.Router()
import forgotpasswordController from "../controller/forgotpasswordControllers.js"
import session from 'express-session'
Route.use(session({
    secret: '666666',
    resave: false,
    saveUninitialized: true
}));

const emailMiddleware = (req, res, next) => {
    if (req.body.email) {
        req.session.email = req.body.email
    }
    next();
};

Route.get('/vertify',emailMiddleware, forgotpasswordController.vertify)
Route.get('/reset',forgotpasswordController.reset)
Route.post('/check', forgotpasswordController.check)
Route.get('/',forgotpasswordController.index)
Route.post('/', emailMiddleware, forgotpasswordController.handle)

export default Route