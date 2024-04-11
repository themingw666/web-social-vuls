import { PrismaClient } from '@prisma/client'
import db from "../config/database.js"

const prisma = new PrismaClient()

// prisma

/*
const search = async (req,res) => {
    const obj = req.query
    console.log(obj.name);
    const users = await prisma.$queryRaw`SELECT firstname, lastname from "User_info" WHERE lastname = ${obj.name}`
    res.json(users)
}
*/

// pg

const search = async (req, res) => {
    const obj = req.query
    const findUser = await db.Client.query(`SELECT firstname, lastname, university, live, job FROM public."User_info"  where lastname = '${obj.name}'`, (err, result) => {
        if(err) console.error('Error!')
        else{
            console.log(result.rows)
            let arrUser = result.rows
            var userinfo = function(arrUser){
                this.arrUser = arrUser
            }
            //res.send(JSON.stringify(arr))
            res.render('search', {userinfo: arrUser})
        }
    })
    
}

export default {search}