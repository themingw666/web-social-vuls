import express  from "express";
import {prisma} from "../config/prisma.js"
 const Route = express.Router()

Route.get('/',  async (req,res) => {
        const userlist = await prisma.user_info.findMany()
    return res.send(JSON.stringify(userlist))
})

export default Route