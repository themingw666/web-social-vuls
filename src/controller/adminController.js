import { prisma } from "../config/prisma.js"

const getAdminPage =  async (req ,res)=> {
  //get all user is not admin
     let userlist = await prisma.$queryRaw`
            SELECT * FROM \"user\" INNER JOIN \"user_info\" ON \"user\".id = user_info.userid  LEFT join user_role ON \"user_info\".userid = user_role.user_id where role_id IS NULL ORDER BY id ASC`
    res.render('admin-panel',{ layout: false ,userlist: userlist })
}
const deleteUser = async (req,res) =>{
   try {
    if(req.query.userid){
      const userid = Number(req.query.userid)
      // await prisma.$executeRaw`DELETE from user_role where user_id = ${userid}`
      await prisma.$queryRaw`DELETE FROM message where ("userSender_id" = ${userid} OR "userRecipient_id" = ${Number(userid)} ) `

      await prisma.$executeRaw`DELETE FROM post_comment WHERE "authorid" = ${userid}`
      // Xóa tất cả các bình luận của người dùng
   
      await prisma.$executeRaw`DELETE FROM post_comment WHERE "postid" IN (SELECT id FROM post WHERE authorid = ${userid})`;
   
// Xóa tất cả các bài đăng của người dùng
  await prisma.$executeRaw`DELETE FROM post WHERE authorid = ${userid}`;
;
      await prisma.user_info.delete({
          where: {
            userid: userid,
          },
        })   
  const deleteUser = await prisma.user.delete({
     where: {
       id: userid,
     },
   })
   if(deleteUser){
      res.send( "success")
      return 
   }else{
      res.send( "faild")
      return 
   }
  } 
   } catch (error) {
    res.send(error)
   return  
  }
   
}

export default {getAdminPage,deleteUser}