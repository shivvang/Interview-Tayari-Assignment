import jwt from "jsonwebtoken";

const authMiddleware  = (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "Access token is missing. Please login to proceed."
        });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.userId;  
        next(); 
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token. Please login again."
        });
    }
};

export default authMiddleware ;
