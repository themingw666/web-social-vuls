import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const handleComment = async (req,res) =>{
    try {
        await prisma.$queryRaw`
        INSERT INTO \"post_comment\" (authorid, postid, content) VALUES (${req.decoded.id}, ${req.body.postid}, ${req.body.content})`
    } catch (error) {
        console.error("Error: ", error.message);
    }
}

export default {handleComment}