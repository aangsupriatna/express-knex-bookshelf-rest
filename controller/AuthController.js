const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

async function signIn(req, res) {
    try {
        await User.where({ username: req.body.username })
            .fetch().then(async user => {
                const valid = await user.checkPassword(req.body.password)
                if (valid) {
                    const token = await jwt.sign({
                        id: user.get('id'),
                        role: user.get('role')
                    }, process.env.JWT_SECRET, { expiresIn: '1d' })
                    res.cookie('token', token, {
                        secure: false,
                        httpOnly: true,
                    })
                    return res.ok(token, { message: 'User authenticated' })
                } else {
                    return res.error(401, { message: 'Wrong password' })
                }
            }).catch(error => {
                if (error.message == 'EmptyResponse') {
                    return res.error(401, { message: 'User not found' })
                } else {
                    return res.error(401, { message: error })
                }
            })
    } catch (error) {
        return res.error(401, { message: 'Signin error' })
    }
}

async function signUp(req, res) {
    try {
        const { username, email, password, password2 } = req.body

        if (password != password2) {
            return res.error(401, { message: 'Password not match' })
        }

        const user = await new User({
            username: username,
            email: email,
            password: password,
            role: 'member'
        }).save()

        return res.status(200).json(user)
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
            return res.error(401, { message: 'User already exists' })
        } else {
            return res.error(401, { message: 'Signup error' })
        }
    }
}

async function signOut(req, res) {
    try {
        return res.status(200)
            .clearCookie('token')
            .json({
                message: 'Token destroyed'
            })
    } catch (error) {
        return res.error(500, { message: error.message })
    }
}

module.exports = {
    signIn,
    signUp,
    signOut
}