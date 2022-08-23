import axiosClient from "./axiosClient";

const authApi = {
    login: params => axiosClient.post('/user/login', params),
    register: params => axiosClient.post('/user/register',params)
}

export default authApi