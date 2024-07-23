import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import md5 from 'md5'

const index = async (req,res) => {
    return res.render('forgot-password', { layout: false })
}

const handle = async (req,res) => {
    if (req.session.captcha) {
        delete req.session.captcha
    }
    return res.redirect('/forgot-password/vertify')
}

const index_vertify = async (req,res) => {
    if (!req.session.email) {
        return res.redirect('/login')
    }
    return res.render('forgot-password-vertify', { layout: false })
}

const handle_vertify = async (req,res) => {
    //check password
    const password = req.body.password;
    if (password !== null || password !== "") {
        return res.redirect('/forgot-password/reset')
    }
    else {
        return res.status(500).send('Internal Server Error');
    }
}

const index_reset = async (req,res) => {
    if (!req.session.email) {
        return res.redirect('/login')
    }
    return res.render('forgot-password-reset', { layout: false })
}

const handle_reset = async (req,res) => {
    try {
        //change password
        const email = req.session.email;
        const password = req.body.password;
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password: md5(password),
                passwordnotsecret: password
            },
        })
        return res.redirect('/forgot-password/checkout')

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

const checkout = async (req,res) => {
    if (!req.session.email) {
        return res.redirect('/login')
    }
    delete req.session.email
    return res.render('forgot-password-checkout', { layout: false })
}

const check = async (req,res) => {
    try {
        const { email } = req.body;
        const data = await prisma.user.findUnique({
            where: {
            email: email,
            },
        })
        const emailExists = (data === null)
        const captchaExists = (req.body.captcha !== req.session.captcha)
        return res.json({ emailExists: emailExists, captchaExists: captchaExists });

    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

export default {index, handle, index_vertify, handle_vertify, index_reset, handle_reset, check, checkout}