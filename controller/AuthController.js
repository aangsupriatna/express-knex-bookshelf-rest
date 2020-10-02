const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

module.exports = {
    signIn: async (req, res) => {
        try {
            await User.where({ username: req.body.username })
                .fetch().then(async user => {
                    const checkPassword = await user.checkPassword(req.body.password)
                    if (checkPassword) {
                        const token = await jwt.sign({ id: user.get('id'), role: user.get('role') },
                            process.env.JWT_SECRET, { expiresIn: '1d' })
                        return res.cookie('token', token, { secure: false, httpOnly: true, })
                            .json({ message: 'User authenticated', token: token })
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
    },

    signUp: async (req, res) => {
        const { username, email, password, password2 } = req.body

        if (password != password2) {
            return res.status(401).json({ message: 'Password not match' })
        }

        await userModel.query()
            .insert({
                username: username,
                email: email,
                password: password,
                role: 'member'
            }).then(newuser => {
                return res.status(200).json({ newuser, message: 'New user added' })
            }).catch(error => {
                if (error.nativeError.code == 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'User already exists' })
                } else {
                    return res.status(400).json({ message: 'Signup error' })
                }
            })
    },

    signOut: async (req, res) => {
        try {
            return res.status(200)
                .clearCookie('token')
                .json({
                    message: 'Token destroyed'
                })
        } catch (error) {
            return res.status(400).json({ message: 'Signout error' })
        }
    }
}