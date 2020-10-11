const Promise = require('bluebird')
const jwt = require('jsonwebtoken')

module.exports = {
    isAuth: Promise.method(async (req, res, next) => {
        const token = req.cookies.token

        if (!token) {
            return res.error(401, {
                message: 'You need to signin'
            })
        }

        await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                Promise.reject(error)
                return res.error(401, error)
            } else {
                req.user = decoded
            }
        })

        next()
    }),

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
