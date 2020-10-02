const jwt = require('jsonwebtoken')

module.exports = {
    isAuth: async (req, res, next) => {
        const token = req.cookies.token || ''
        try {
            if (!token) {
                return res.status(401).json({ message: 'You need to signin' })
            }
            var decoded = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                res.status(401).json({ message: 'Token expired, please signin' })
            } else {
                res.status(401).json({ message: 'Authentication error' })
            }
        }
    },

    isAuthorized: (req, res, next) => {
        if (req.user.role == 'admin') {
            next()
        } else {
            res.status(401).json({
                message: 'User not authorized'
            })
        }
    }
}
