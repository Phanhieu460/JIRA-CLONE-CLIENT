import axios from 'axios'

const API_URL = 'http://localhost:1337'

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/user/register`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/user/login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    login,
    register, logout
}
export default authService