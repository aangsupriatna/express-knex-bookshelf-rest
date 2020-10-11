const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

async function signIn(req, res) {
    const { username, password } = req.body

    User.signin(username, password).then((user) => {
        const token = jwt.sign({
            id: user.get('id'),
            role: user.get('role')
        }, process.env.JWT_SECRET, {
            expiresIn: '1Y'
        })
        res.cookie('token', token, {
            secure: false,
            httpOnly: true,
        })
        return res.ok(user, {
            message: 'Login success'
        })
    }).catch((error) => {
        return res.error(401, {
            message: error
        })
    })
}

async function signUp(req, res) {
    const {
        username,
        email,
        password,
        password2
    } = req.body

    User.signup(username, email, password, password2)
        .then((user) => {
            return res.ok(user, {
                message: 'Signup success'
            })
        }).catch((error) => {
            return res.error(401, {
                message: error
            })
        })
}

async function whoAmI(req, res) {
    User.whoami(req.user.id)
        .then((user) => {
            return res.ok(user, {
                message: `Hi ${user.get('username')} This is yours`
            })
        }).catch((error) => {
            return res.error(500, {
                message: error
            })
        })
}

async function signOut(req, res) {
    return res.status(200)
        .clearCookie('token')
        .json({
            message: 'Token destroyed'
        })
}

module.exports = {
    signIn,
    signUp,
    signOut,
    whoAmI
}