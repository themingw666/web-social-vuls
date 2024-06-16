import crypto from 'crypto';

const csrfProtection = async (req, res, next) => {
    const token = crypto.randomBytes(16).toString('hex');
    
    res.cookie('csrfToken', token, {
        httpOnly: true,
        //secure: true, // HTTPS
        sameSite: 'strict'
    });
    next();
};

export { csrfProtection };