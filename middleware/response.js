module.exports = (options) => {
    return function (req, res, next) {
        res.ok = function (value, data) {
            return res.status(200).json({
                value: value, data
            })
        }

        res.error = function (status, data) {
            return res.status(status).json({
                error: true, data
            })
        }

        next()
    }
}