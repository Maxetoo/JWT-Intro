const jwt = require('jsonwebtoken')
const login = async(req, res) => {
    const { username, password } = req.body
    const id = new Date().getTime()
    try {
        if (!username || !password) {
            // throw Error(`please provide username or password`, 404)
            return res.status(401).json({
                success: false,
                msg: `please input username or password`,
            })
        }
        const token = jwt.sign({
                id,
                username,
                password,
            },
            process.env.JWT_SECRET, { expiresIn: '10d' }
        )
        res.status(200).json({
            success: true,
            token,
        })
    } catch (error) {
        console.log(error.message)
    }
}

const dashboard = async(req, res) => {
    const authToken = req.headers.authorization
    try {
        const auth = req.headers.authorization.split(' ')[1]
        if (!authToken || !authToken.startsWith('Bearer ')) {
            throw Error('authorizartion token should be present')
        }
        const token = jwt.verify(auth, process.env.JWT_SECRET)
        const { id, username, password } = token
        res.status(200).json({
            success: true,
            id,
            username,
            password,
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    login,
    dashboard,
}