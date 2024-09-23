import jsonwebtoken from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'You are not authenticated!',
            error: "Unauthorized"
        });
    }

    try {
        // Verify the token
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user information to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            message: 'Token is not valid!',
            error: error.message
        });
    }
};

export default authMiddleware;
