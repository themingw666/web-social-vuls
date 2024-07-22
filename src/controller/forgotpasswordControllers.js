import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const index = async (req,res) => {
    return res.render('forgot-password', { layout: false })
}

const handle = async (req,res) => {
    return res.redirect('/forgot-password/vertify')
}

const vertify = async (req,res) => {
    const email = req.session.email;
    console.log(email);
    return res.render('forgot-password-vertify', { layout: false })
}

const reset = async (req,res) => {
    return res.render('forgot-password-reset', { layout: false })
}

const check = async (req,res) => {
    try {
        const { email } = req.body;
        const data = await prisma.user.findUnique({
            where: {
            email: email,
            },
        })
        
        const emailExists = (data !== null)
        return res.json({ emailExists: emailExists });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default {index, handle, vertify, reset, check}