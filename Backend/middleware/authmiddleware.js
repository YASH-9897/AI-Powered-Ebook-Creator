const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //GET TOKEN FROM HREADER
            token = req.headers.authorization.split(' ')[1];

            //VERIFY TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //gET USER FROM TOKEN 
            req.User = await User.findById(decoded.id).select('-password');


            next();

        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: 'Not authorized, token failed ' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized , no token' });
    }
};

module.exports = { protect };