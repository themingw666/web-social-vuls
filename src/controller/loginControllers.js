import {PrismaClient } from '@prisma/client'
import bcryptjs from "bcryptjs"
import jsonwebtoken from 'jsonwebtoken'
const prisma = new PrismaClient()
const getLoginPage =(req,res) =>{
    res.render('form-login', { layout: false })
}
const  handleLogin =  async (req,res) =>{
    const {email,password,rememberme} = await  req.body
<<<<<<< HEAD
    // if(email.toLowerCase().includes('select')){
    //   const error = {
    //     message : "Email or Password is incorrect !"
    // }
    // console.log("hi")
    //   return res.render('form-login', { layout: false ,error:error})
    // }
=======
    
>>>>>>> bf9edc8c01a062bfcfb41b77861773f1a16f4103
    try{
      //check setting 
      const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='SQL Injection'`
      let result
      if (setting.status === 'Yes'){
       result = await prisma.$queryRawUnsafe(`SELECT * FROM \"user\" where email='${email}'`)
      }else {
       result = await prisma.$queryRaw`SELECT * FROM \"user\" where email=${email}`
      }
<<<<<<< HEAD
      // console.log(result)
=======

>>>>>>> bf9edc8c01a062bfcfb41b77861773f1a16f4103
      //verifty 
      if(result.length == 0 || md5(password) !== result[0].password) {
          const error = {
              message : "Email or Password is incorrect !"
          }
         return res.render('form-login', { layout: false ,error:error})
     
      }else{
          //create JWT token 1
          const jwtsecret = process.env.SecretJWT
       const payload = {
            id : result[0].id,
            username: result[0].username,
         }
      const token = jsonwebtoken.sign(payload,jwtsecret,{
          expiresIn: '5d'
         })
         res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 10000 * 1000,
        });
          res.redirect('/')
      }
    } catch(ERROR) {
      // console.log(error)
      const error = {
        message : "Email or Password is incorrect !"
    }
   return res.render('form-login', { layout: false ,error:error})
    }
}
export default {getLoginPage,handleLogin}