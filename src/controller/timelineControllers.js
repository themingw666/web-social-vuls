import db from '../config/database.js'
import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getTimelinePage(req,res){
    const { id } = req.query
    if (!id) {
        return res.render('timelineerror', {data: "Missing id parameter"})
    }
    const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='SQL Injection'`
    if (setting.status === 'Yes'){
        try {
            const result = await prisma.$queryRawUnsafe(`SELECT * FROM \"user_info\" WHERE userid = '${id}'`)
            const blacklist = ['select', 'SELECT', 'union', 'UNION', 'drop', 'DROP', 'OR', 'and', 'AND', 'substring', 'SUBSTRING', 'pg_sleep', 'PG_SLEEP', '-', '#']
            for (let i = 0; i < blacklist.length; i++) {
                if (id.includes(blacklist[i])) {
                    res.render('timelineerror', {data: "NO SQLi !!"})
                }
            }
            if (result.length === 0) {
                res.render('timelineerror', {data: "User not found"})
            }
            const data = result[0]
            res.render('timeline', {data})
        } catch (err) {
            res.render('timelineerror', {data: "Error executing query"})
        }
    } else {
        const id1 = Number(id)
        if (isNaN(id1))
            res.render('timelineerror', {data: "id is not valid"})
        try {
            const data = await prisma.user_info.findUnique({
                where: {
                userid: id1,
                },
            })
            if (data == null)
                next()
            res.render('timeline', {data})
        } catch (error) {
            res.render('timelineerror', {data: "User not found"})
        }
    }
}

export default {getTimelinePage}