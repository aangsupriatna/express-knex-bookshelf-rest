const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/UserModel')

module.exports = {
    signIn: async (req, res) => {
        const { username, password } = req.body
        await userModel
            .query()
            .findOne({
                username: username
            }).then(async (user) => {
                // check password
                const checkPassword = bcrypt.compareSync(password, user.password)
                if (checkPassword) {
                    // generate jwt token
                    const token = await jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
                    if (token) {
                        return res.cookie('token', token, {
                            secure: false,
                            httpOnly: true,
                        }).json({ message: 'User authenticated', token: token })
                    }
                } else {
                    return res.status(401).json({ message: 'Wrong password' })
                }
            }).catch(error => {
                return res.status(401).json({ message: 'User not found' })
            })
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