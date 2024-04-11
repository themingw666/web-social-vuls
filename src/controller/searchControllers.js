import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const search = async (req,res) => {
    const obj = req.query
    console.log(obj.name);
    const users = await prisma.$queryRaw`SELECT * from user_info WHERE lastname = ${obj.name}`
    res.json(users)
}
export default {search}