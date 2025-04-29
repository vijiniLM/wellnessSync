const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Your JWT secret here
        req.user = decoded;  // Attach decoded user data to the request
        next();  // Proceed to the next middleware or route
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;