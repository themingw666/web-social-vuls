import jwt from 'jsonwebtoken';

async function mytimeline(req,res){
    res.redirect(`/timeline?id=${req.decoded.id}`)
}

async function logout(req,res){
    res.cookie('jwt', '', { expiresIn: '1d' }).redirect('/')
}

export default {mytimeline, logout}