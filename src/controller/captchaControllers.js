import svgCaptcha from 'svg-captcha';

const index = async (req,res) =>{
    const captcha = svgCaptcha.create({
        background: '#ADD8E6',
    });
    req.session.captcha = captcha.text;
    res.type('svg');
    res.send(captcha.data);
}

export default {index}