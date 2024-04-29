import { prisma } from '../config/prisma.js';
import express from "express"
const app = express()

const pagedata = async(req,res,next) => {
    try {
        let id = Number(req.decoded.id)
        if (isNaN(id)) {
            res.clearCookie('jwt')
            next()
        }
        const data = await prisma.user_info.findUnique({
            where: {
            userid: id,
            },
        })
        if (data === null)
            next()
        let firstname = data.firstname
        req.fulldata = { firstname: firstname };
        next()
    } catch (error) {
        res.clearCookie('jwt')
        next()
    }
}

export {pagedata}