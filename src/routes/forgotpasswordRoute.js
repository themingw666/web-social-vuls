import express from "express";
const Route = express.Router()
import forgotpasswordController from "../controller/forgotpasswordControllers.js"
import session from 'express-session'

Route.use(session({
    secret: '666666',
    resave: false,
    saveUninitialized: true
}));

const dataMiddleware = (req, res, next) => {
    if (req.body.email) {
        req.session.email = req.body.email
    }
    next();
};

Route.get('/vertify', dataMiddleware, forgotpasswordController.index_vertify)
Route.post('/vertify', dataMiddleware, forgotpasswordController.handle_vertify)
Route.get('/reset', dataMiddleware, forgotpasswordController.index_reset)
Route.post('/reset', dataMiddleware, forgotpasswordController.handle_reset)
Route.post('/check-data', forgotpasswordController.check)
Route.get('/checkout',forgotpasswordController.checkout)
Route.get('/',forgotpasswordController.index)
Route.post('/', dataMiddleware, forgotpasswordController.handle)

export default Route