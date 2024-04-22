import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const userAuth = async (req,res,next) => {
    const prisma = new PrismaClient()
    try{
      if(req.path == '/form-login' && (!req.headers.cookie || !req.headers.cookie.split('=')[1]) 
        || req.path == '/fakedata' || req.path == '/settings'){
         next()
      }
       else {
          const token = req.headers.cookie.split('=')[1];
          let decoded;
          const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='JWT'`
          //verifty token
          if (setting.status === "Easy"){
            decoded = jwt.decode(token)
          }
          else if (setting.status === "Medium"){
            decoded = jwt.verify(token, process.env.NotSecretJWT) // NotSecretJWT
          }
          else if (setting.status === "Hard"){
              //hard

          }
          else {
            decoded = jwt.verify(token, process.env.SecretJWT)
          }
          req.decoded = decoded
          const username = decoded.username
          const result = await prisma.user.findUnique({
            where: {
                username: username,
              },
          })
          if (req.path == '/form-login')
            return res.redirect("/")
          if (result != null){
              next()
          }
      }
    } catch (error) {
        return res.cookie('jwt', '', { expiresIn: '1d' }).redirect('/form-login')
    }
}

export {userAuth}