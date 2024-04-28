import {PrismaClient } from '@prisma/client'
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { v4 as uuidv4 } from 'uuid';
import fs from "fs"
import { fileURLToPath } from 'url'
import path from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const prisma = new PrismaClient()

const getLoginPage =(req,res) =>{
   return res.render('form-login', { layout: false })
}
const handleLogin = async (req,res) =>{
    const {email,password,rememberme} = await req.body
    
    try{
      //check setting 
      const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='SQL Injection'`
      let result
      if (setting.status === 'Easy'){
       result = await prisma.$queryRawUnsafe(`SELECT * FROM \"user\" where email='${email}'`)
      } 
      if (setting.status === 'None') {
       result = await prisma.$queryRaw`SELECT * FROM \"user\" where email=${email}`
      }
      //verifty 
      if(result.length == 0 || md5(password) !== result[0].password) {
          const error = {
              message : "Email or Password is incorrect !"
          }
         return res.render('form-login', { layout: false ,error:error})
     
      }else{
          //create JWT token 1
          const header = {
            alg: 'HS256', // Algorithm
            typ: 'JWT' ,   // Type
        };
          let jwtsecret = process.env.SecretJWT
       const payload = {
            id: result[0].id,
            username: result[0].username,
         }
      const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='JWT'`
      if (setting.status === "Medium") {
        jwtsecret = process.env.NotSecretJWT // Not secret JWT
      }  
      if(setting.status === "Hard"){
       header.kid = "6f597b7-fd81-44c7-956f-6937ea94cdf6"
       const  data = fs.readFileSync(path.join(__dirname,'../helper/key/',header.kid),'utf-8')
        jwtsecret = data
    }
    const token=jwt.sign(payload,jwtsecret,{expiresIn: '5d' ,header })
         res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 10000 * 1000,
        });
        return res.redirect('/')
      }
    } catch(ERROR) {
      console.log(ERROR)
      const error = {
        message : "Email or Password is incorrect !"
    }
   return res.render('form-login', { layout: false ,error:error})
    }
}

export default {getLoginPage,handleLogin}