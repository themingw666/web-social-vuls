import express from "express"
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import expressLayouts from "express-ejs-layouts"


const configViewEngine = (app,__dirname) => {
   
    // config setting 
        app.set('views',path.join(__dirname,"views"))
        app.set('view engine', 'ejs')
    // static 
        app.use(express.static(path.join(__dirname,"public")))
        app.use(expressLayouts);
        app.set('layout', 'layouts/main');
}
export default configViewEngine ;