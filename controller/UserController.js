const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

module.exports = {
    // display all users
    get: async (req, res) => {
        await User.fetchAll()
            .then(user => {
                return res.status(200).json(user)
            }).catch(error => {
                return res.status(500).json(error)
            })
    },
    // store new user
    store: async (req, res) => {
        try {
            const { username, email, password, password2 } = req.body

            if (password != password2) {
                return res.status(401).json({ message: 'Password not match' })
            }

            const user = await new User({
                username: username,
                email: email,
                password: password,
                role: 'member'
            }).save()

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    // display one user
    show: async (req, res) => {
        const id = req.params.id

        await User.where({ id: id }).fetch()
            .then(user => {
                return res.status(200).json(user)
            }).catch(error => {
                return res.status(400).json({ message: 'Getting user error', error })
            })
    },
    // update user
    update: async (req, res) => {
        try {
            const { username, email, password, password2, role } = req.body
            const id = req.params.id

            if (password && password != password2) {
                return res.status(400).json({ message: 'Password not match' })
            }

            const user = await User.where({ id: id }).fetch().then(user => {
                user.set({
                    username: username,
                    email: email,
                    password: password,
                    role: role
                })
                return user.save()
            })

            return res.status(200).json(user)

        } catch (error) {
            return res.status(400).json({ message: 'Update user error' })
        }
    },
    // delete user
    destroy: async (req, res) => {
        try {
            const id = req.params.id

            const user = await new User({ id: id }).destroy()
            return res.status(200).json(user)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}