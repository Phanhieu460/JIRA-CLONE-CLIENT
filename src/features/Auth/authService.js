import axios from 'axios'

const API_URL = 'http://localhost:1337'
const getAll = async () => {
    const response = await axios.get(`${API_URL}/user/listUser`)
    return response.data
}
const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/user/${id}`)
    return response.data
}
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
const updateUser = async (dataUpdate, userId) => {
  
    const response = await axios.patch(`${API_URL}/user/${userId}`,dataUpdate)
  
    return response.data
  }
const authService = {
    getUserById,
    getAll,
    login,
    register, 
    logout,
    updateUser,
}
export default authService