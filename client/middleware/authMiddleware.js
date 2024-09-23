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
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({
            message: 'Token is not valid!',
            error: error.message
        });
    }
};

export default authMiddleware;
