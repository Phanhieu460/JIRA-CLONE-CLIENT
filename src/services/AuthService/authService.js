import axios from "axios";

const API_URL = "http://localhost:1337";

export const authService = {
  login: (userLogin) => {
    return axios.post(`${API_URL}/user/login`, userLogin);
  },
  register: (userRegister) => {
    return axios.post(`${API_URL}/user/register`, userRegister);
  },
};
