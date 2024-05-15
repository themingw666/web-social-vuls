import { prisma } from "../config/prisma.js"
const getMessagePage = (req,res) => {
    res.render('messages')
}
const getchat = async (req,res) => {
    try {
        const messages = await prisma.$queryRaw`Select * from message where ("userSender_id" = ${req.fulldata.data1.id} and "userRecipient_id" = ${Number(req.params.receiveID)} ) OR ("userSender_id" = ${Number(req.params.receiveID)} and "userRecipient_id" = ${Number(req.fulldata.data1.id)})`
        res.send(JSON.stringify(messages))
    } catch (error) {
        res.send(JSON.stringify(error))
        
    }
 }

// ws server 
const getMessage = (req , res ) => {
    console.log(req.fulldata)
    res.end()
}
export default {getMessagePage,getMessage,getchat}