const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    // Get token from request header
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Access denied. Please login."
        });
    }

    try {

        // Verify JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user ID in request
        req.userId = decoded.id;

        // Allow next function to execute
        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid or expired token"
        });

    }

};

module.exports = authMiddleware;