import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import fs from "fs"
import { fileURLToPath } from 'url'
import path from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import jwt from 'jsonwebtoken'
import validator from 'validator'

const getSettingPage = async (req,res) =>{
    const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='Broken Authentication'`
    if (setting.status === 'Easy'){
        const { id } = req.query
        if (!id) {
            return res.render('timelineerror', {data: "Missing id parameter"})
        }
        const id1 = Number(id)
        if (isNaN(id1))
            return res.render('timelineerror', {data: "id is not valid"})
        
        try {
            //fetch data name and avatar
            const data = await prisma.user_info.findUnique({
                where: {
                userid: id1,
                },
            })
            const data1 = await prisma.user.findUnique({
                where: {
                id: id1,
                },
            })
            if (data === null || data1 === null)
                next()
            
            //Re-sign
            const header = {
                alg: 'RS256',
                typ: 'JWT',
            }
            const payload = {
                id: id1,
                username: data1.username,
            }
            const privateKey = fs.readFileSync(path.join(__dirname,'../helper/key/privatekey.pem'),'utf-8')
            const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', header });
            res.cookie("jwt", token, {
                httpOnly: true,    
                maxAge: 10000 * 1000,
            });
            return res.render('setting', {data, data1})
        } catch (error) {
            return res.render('timelineerror', {data: "User not found"})
        }
    }
    else if (setting.status === 'Medium'){
        const { id } = req.query
        if (!id) {
            return res.render('timelineerror', {data: "Missing id parameter"})
        }
        const id1 = Number(id)
        if (isNaN(id1))
            return res.render('timelineerror', {data: "id is not valid"})
        
        try {
            //fetch data name and avatar
            const data = await prisma.user_info.findUnique({
                where: {
                userid: id1,
                },
            })
            const data1 = await prisma.user.findUnique({
                where: {
                id: id1,
                },
            })
            if (data === null || data1 === null)
                next()
            
            if (id1 != req.decoded.id){
                res.render('setting', { data, data1 }, (err, html) => {
                    if (err) {
                        res.status(500).send('An error occurred while rendering the page');
                    } else {
                        res.clearCookie('jwt')
                        res.set('Location', '/form-login');
                        res.status(302).send(html);
                    }
                });
            }
            else {
                return res.render('setting', {data, data1})
            }
        } catch (error) {
            return res.render('timelineerror', {data: "User not found"})
        }
    }
    else {
        const data = await prisma.user_info.findUnique({
            where: {
            userid: req.decoded.id,
            },
        })
        const data1 = await prisma.user.findUnique({
            where: {
            id: req.decoded.id,
            },
        })
        if (data === null || data1 === null)
            next()
        
        return res.render('setting', {data, data1})
    }
}

const postSettingPage = async (req,res) => {
    try {
        const {username, email} = req.body
        let data

        data = await prisma.user.findUnique({
            where: {
            email: email,
            },
        })
        if (validator.isEmail(email) && !data) {
            await prisma.user.update({
                where: {
                    id: req.decoded.id,
                },
                data: {
                    email: email,
                },
            })
        }
        data = await prisma.user.findUnique({
            where: {
            username: username,
            },
        })
        if (username && !data) {
            await prisma.user.update({
                where: {
                    id: req.decoded.id,
                },
                data: {
                    username: username,
                },
            })
            
            //Re-sign
            const header = {
                alg: 'RS256',
                typ: 'JWT',
            }
            const payload = {
                id: req.decoded.id,
                username: username,
            }
            const privateKey = fs.readFileSync(path.join(__dirname,'../helper/key/privatekey.pem'),'utf-8')
            const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', header });
            res.cookie("jwt", token, {
                httpOnly: true,    
                maxAge: 10000 * 1000,
            });
        }
        return res.redirect('profile/setting');

    } catch (error) {
        console.log(error)
    }
}

export default {getSettingPage, postSettingPage}