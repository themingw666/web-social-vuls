const index = async (req,res) => {
    return res.render('forgot-password', { layout: false })
}

const vertify = async (req,res) => {
    return res.render('forgot-password-vertify', { layout: false })
}

const reset = async (req,res) => {
    return res.render('forgot-password-reset', { layout: false })
}

export default {index, vertify, reset}