import {PrismaClient } from '@prisma/client'
import bcryptjs from "bcryptjs"
import jsonwebtoken from 'jsonwebtoken'
const prisma = new PrismaClient()
const getLoginPage =(req,res) =>{
    res.render('form-login', { layout: false })
}
const handleLogin = async (req,res) =>{
    const {email,password} = req.body
    const result = await prisma.user.findUnique({
        where: {
          email: email,
        },
      })

    //verifty 
    if(result == null || password !== result.password) {
        const error = {
            message : "Email or Password is incorrect !"
        }
        res.render('form-login', { layout: false, error: error })

    }else{
        //create JWT token 
        const jwtsecret = process.env.SecretJWT
     const payload = {
          id : result.id,
          username: result.username,
       }
    const token = jsonwebtoken.sign(payload,jwtsecret,{
        expiresIn: '5d'
       })
       res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 10000 * 1000,
      })
        res.redirect('/')
    }
}
export default {getLoginPage,handleLogin}