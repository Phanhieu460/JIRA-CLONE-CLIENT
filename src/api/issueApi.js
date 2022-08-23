import axiosClient from "./axiosClient";

const issueApi = {
    create: (params) => axiosClient.post('/issues', params),
    update: (id, params) => axiosClient.patch(`/issues/${id}`, params),
    delete: (id) => axiosClient.delete(`/issues/${id}`)
}

export default issueApi