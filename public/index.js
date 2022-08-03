const form = document.querySelector('.login-form')
const userInput = document.querySelector('.user-input')
const passwordInput = document.querySelector('.password-input')
const button = document.querySelector('.btn-submit')
const dashboardName = document.querySelector('.dashboard-name')
const dashboardID = document.querySelector('.dashboard-id')
const alertMsg = document.querySelector('.message')
let loggedin = false

const submitForm = async(e) => {
    e.preventDefault()
    const usernameDOM = userInput.value
    const passwordDOM = passwordInput.value
    try {
        if (usernameDOM && passwordDOM) {
            const { data } = await axios.post('/api/v1/login', {
                username: usernameDOM,
                password: passwordDOM,
            })
            console.log(data)
            localStorage.setItem('token', data.token)
            const getToken = localStorage.getItem('token')
            const {
                data: { id, username },
            } = await axios.get('/api/v1/dashboard', {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                },
            })
            alertMsg.innerHTML = `Logged In...`
        } else {
            alertMsg.innerHTML = `Please input username or password`
        }
    } catch (error) {
        console.log(error.message)
        alertMsg.innerHTML = `No Token Available`
        userInput.value = ''
        passwordInput.value = ''
    }
    userInput.value = ''
    passwordInput.value = ''

    setTimeout(() => {
        alertMsg.innerHTML = ''
    }, 1500)
}

form.addEventListener('submit', submitForm)
button.addEventListener('click', submitForm)