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
                    return res.cookie('token', token, {
                        secure: false,
                        httpOnly: true,
                    }).json({ message: 'User authenticated', token: token })
                } else {
                    return res.status(401).json({ error: 'Wrong password' })
                }
            }).catch(error => {
                if (error.message == 'EmptyResponse') {
                    return res.status(401).json({ error: 'User not found' })
                } else {
                    throw new Error(error)
                }
            })
    } catch (error) {
        return res.status(401).json({ error: 'Signin error', error })
    }
}

async function signUp(req, res) {
    try {
        const { username, email, password, password2 } = req.body

        if (password != password2) {
            return res.status(401).json({ error: 'Password not match' })
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
            return res.status(400).json({ error: 'User already exists' })
        } else {
            return res.status(400).json({ error: 'Signup error' })
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
        return res.status(400).json({ error: 'Signout error' })
    }
}

module.exports = {
    signIn,
    signUp,
    signOut
}