import express  from "express";
import searchController from "../controller/searchControllers.js"
import { prisma } from '../config/prisma.js';

const Route =  express.Router()
const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='SQL Injection'`
Route.get('/', searchController.search)
/*if (setting.status === 'Easy'){
    Route.get('/', searchController.search)
}
else {
    Route.get('/', searchController.search2)
}
*/

export default Route