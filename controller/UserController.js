const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

async function get(req, res) {
    await User.fetchAll({
        withRelated: ['book', 'profile']
    }).then((user) => {
        return res.ok(user, {
            message: 'Fetch all users success'
        })
    }).catch((error) => {
        return res.error(500, {
            message: 'Fetch all users error'
        })
    })
}

async function store(req, res) {
    const {
        username,
        email,
        password,
        password2,
        attachment_name
    } = req.body

    User.signup(username, email, password, password2, attachment_name)
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

async function show(req, res) {
    const id = req.params.id
    await new User({ id: id }).fetch({
        withRelated: ['book', 'profile']
    }).then((user) => {
        return res.ok(user, {
            message: 'Fetch user success'
        })
    }).catch((error) => {
        return res.error(400, {
            message: 'Fetch user error'
        })
    })
}

async function update(req, res) {
    const id = req.params.id
    const {
        username,
        email,
        password,
        password2,
        role
    } = req.body

    await User.update(id, username, email, password, password2, role)
        .then((user) => {
            return res.ok(user, { message: 'Update success' })
        }).catch((error) => {
            return res.error(401, { message: error })
        })
}

async function destroy(req, res) {
    const id = req.params.id
    await new User({ id: id }).destroy()
        .then((user) => {
            return res.ok(id, {
                message: 'User destroyed'
            })
        }).catch((error) => {
            return res.error(400, {
                message: error.message
            })
        })
}

module.exports = {
    get,
    store,
    show,
    update,
    destroy
}