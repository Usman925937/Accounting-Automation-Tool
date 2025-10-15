const isApprovedMiddleware = (req, res, next) => {
    if (!req.user.isApproved) {
        return res.status(403).json({ message: 'Access denied: Approved Users only' });
    }

    next();
}

module.exports = isApprovedMiddleware;