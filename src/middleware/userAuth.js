import jsonwebtoken  from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const userAuth = async (req,res,next) => {
    
    const mysecretkey = process.env.SecretJWT
    const prisma = new PrismaClient()
    //verifty token 
    try{
        // console.log(req.headers)
      if(req.path  == '/form-login'){
         next()
      }
       else {
          //integerity 
        const token = req.headers.cookie.split('=')[1];
        const decode = jsonwebtoken.verify(token,mysecretkey)
        const id = decode.id
        const result =  await prisma.user.findUnique({
          where: {
              id: id,
            },
        })
  
        if(result != null){
            next()
        }

    }
      
      
  
    
    } catch (error) {
        
        res.redirect("/form-login")
      }
}
export {userAuth}