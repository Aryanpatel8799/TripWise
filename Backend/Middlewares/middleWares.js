const { cookie } = require('express-validator');
const blacklistTokenModel = require('../DB_Model/blackListTokenModel');
const jwt = require('jsonwebtoken');
const User = require('../DB_Model/userModel');

module.exports.authUser = async (req, res, next) => {

    const token = req.cookies.token ||  req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    const isBlacklistedTokenExists = await blacklistTokenModel.findOne({token:token});
    if (isBlacklistedTokenExists) {
        return res.status(401).json({ message: 'Token has been blacklisted' });
    }
    try{

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await User.findById(decodedToken._id);
        req.user = user;
        return next();
    }
    catch(error){
        return res.status(403).json({ message: 'Token is not valid' });
    }
}