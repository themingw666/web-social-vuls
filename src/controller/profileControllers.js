import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function mytimeline(req,res){
    return res.redirect(`/timeline?id=${req.decoded.id}`)
}

async function logout(req,res){
    return res.clearCookie('jwt').redirect('/form-login')
}

async function index(req,res){
    const firstname = req.fulldata.firstname
    res.setHeader('Content-Type', 'application/json');
    res.json({ firstname: firstname })
}

export default {mytimeline, logout, index}