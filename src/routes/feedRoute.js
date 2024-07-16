import express from "express"
const Route = express.Router()
import homeController from "../controller/homeControllers.js"
import multer from 'multer';

//upload document file
const upload = multer({storage: multer.memoryStorage()});
//const upload = multer({ dest: 'uploads/' });

Route.get("/",homeController.getHomePage)
Route.post("/",upload.fields([{ name: 'docfile' }, { name: 'imagefile' }]),homeController.handleHome)

export default Route