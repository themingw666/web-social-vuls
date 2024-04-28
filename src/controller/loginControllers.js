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
import fs from 'fs';
import path from 'path';
const __dirname = import.meta.dirname;

const getLoginPage =(req,res) =>{
   return res.render('form-login', { layout: false })
}
const handleLogin = async (req,res) =>{
    const {email,password,rememberme} = await req.body
    /*let private_key = path.join(__dirname, '../helper/RSA_keys/private_key.pem')
        const private_key_pem = fs.readFileSync(private_key, 'utf8');
        const private_key_jwk = forge.pki.privateKeyFromPem(private_key_pem);
        const { e, n } = private_key_jwk;
        
        console.log(Buffer.from(e.toString('hex'), 'hex').toString('base64'))*/
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
        
        /*const header = {
          "kid": "ed2Nf8sb-sD6ng0-scs5390g-fFD8sfxG",
          "typ": "JWT",
          "alg": "RS256",
          "jwk": {
              "kty": "RSA",
              "e": "AQAB",
              "kid": "ed2Nf8sb-sD6ng0-scs5390g-fFD8sfxG",
              "n": "yy1wpYmffgXBxhAUJzHHocCuJolwDqql75ZWuCQ_cb33K2vh9m"
          }
        };*/
        
        /*const private_key = path.join(__dirname, '../helper/RSA_keys/private_key.jwk')
        const private_key_pem = fs.readFileSync(private_key, 'utf8');
        jwk = JSON.parse(private_key_pem)
        console.log(jwk)
        const header = {
          "kid": "ed2Nf8sb-sD6ng0-scs5390g-fFD8sfxG",
          "typ": "JWT",
          "alg": "RS256",
          jwk
        };

        const token = jsonwebtoken.sign(payload,jwk,{
          expiresIn: '5d',
          header
          })
          res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 10000 * 1000,
        });
          res.redirect('/')
      }*/


    } catch(ERROR) {
      console.log(ERROR)
      const error = {
        message : "Email or Password is incorrect !"
    }
   return res.render('form-login', { layout: false ,error:error})
    }
}
export default {getLoginPage,handleLogin}