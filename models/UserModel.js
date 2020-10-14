const Promise = require('bluebird')
const bookshelf = require('../bookshelf')
const Attachment = require('./AttachmentModel')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

const UserProfile = require('./UserProfileModel')

const User = bookshelf.model('User', {
    tableName: 'users',
    hasTimestamps: true,
    hidden: ['password'],

    initialize() {
        this.on('saving', model => {
            this.hashPassword(model)
        })
    },

    profile() {
        return this.hasOne('UserProfile')
    },

    book() {
        return this.belongsToMany('Book', 'books_users')
    },

    attachments() {
        return this.morphMany('Attachment', 'imageable')
    },

    hashPassword: (model) => {
        if (model.get('password')) {
            return model.set({
                password: bcrypt.hashSync(model.get('password'), 10)
            })
        }
    }
},
    {
        signin: Promise.method(async (username, password) => {
            return new User({ username })
                .fetch()
                .tap(async (user) => {
                    const valid = await bcrypt.compareSync(password, user.get('password'))
                    if (!valid) {
                        return Promise.reject('Invalid password')
                    }
                })
        }),

        signup: Promise.method((username, email, password, password2, attachment_name) => {
            if (password != password2) {
                return Promise.reject('Password not match')
            }
            return new User({
                username,
                email,
                password,
                role: 'member'
            }).save()
                .then(function (user) {
                    const attachment = new Attachment({
                        name: user.get('username'),
                        imageable_id: user.get('id'),
                        imageable_type: 'user'
                    })

                    return [attachment.save(), user]
                })
                .catch((error) => {
                    return Promise.reject(error)
                })
        }),

        update: Promise.method(async (id, username, email, password, password2, role) => {
            if (password != password2) {
                return Promise.reject('Password not match')
            }

            return await new User({ id: id }).fetch()
                .then(user => {
                    user.set({
                        username: username,
                        email: email,
                        password: password,
                        role: role
                    })
                    return user.save()
                })
        }),

        whoami: Promise.method(async (id) => {
            return await new User({ id })
                .fetch()
                .then((user) => {
                    return Promise.resolve(user)
                }).catch((error) => {
                    return Promise.reject('Who are you?')
                })
        })
    }
)

module.exports = User