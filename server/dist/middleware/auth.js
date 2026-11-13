import jwt from 'jsonwebtoken';
export function auth(req, res, next) { const token = req.headers.authorization?.replace('Bearer ', ''); if (!token)
    return res.status(401).json({ message: 'Authentication required' }); try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'foodlink_dev_secret_change_me');
    next();
}
catch {
    return res.status(401).json({ message: 'Invalid token' });
} }
export function roles(...allowed) { return (req, res, next) => { if (!req.user || !allowed.includes(req.user.role))
    return res.status(403).json({ message: 'You do not have permission' }); next(); }; }
