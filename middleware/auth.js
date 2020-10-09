const jwt = require('jsonwebtoken')

module.exports = {
    isAuth: async (req, res, next) => {
        const token = req.cookies.token || ''
        try {
            if (!token) {
                return res.error(401, {
                    message: 'You need to signin'
                })
            }
            var decoded = await jwt.verify(token, process.env.JWT_SECRET || 'mysupersecret')
            req.user = decoded
            next()
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                return res.error(401, {
                    message: 'Token expired, please signin'
                })
            } else {
                return res.error(500, {
                    message: 'Authentication error'
                })
            }
        }
    },

    isAuthorized: (req, res, next) => {
        if (req.user.role == 'admin') {
            next()
        } else {
            return res.error(401, {
                message: 'User not authorized'
            })
        }
    }
}
