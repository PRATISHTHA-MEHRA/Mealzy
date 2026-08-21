

import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : req.headers.token; // fallback if any existing routes send it as a plain "token" header

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, please log in' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access only' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default adminAuth;