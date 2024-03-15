import express from "express"
import configViewEngine from "./config/viewEngine.js"
import Route from "./routes/index.js"
import 'dotenv/config'
import path from "path"
import { fileURLToPath } from 'url';
import { get404page } from './middleware/404.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

 const port = process.env.PORT || 8080
//config view 
configViewEngine(app,__dirname)

//route
app.use("/",Route)

//handl 404 not found 
app.use(get404page)
//bind 
app.listen(port,()=>{
    console.log(`server is listening on http://localhost:${port}`)
})