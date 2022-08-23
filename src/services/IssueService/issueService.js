import axios from "axios"
const id_token = localStorage.getItem('token');

const API_URL = 'http://localhost:1337'
export const issueService = {
    createTask: (newIssue) => {
        return axios({
            url: `${API_URL}/issues`,
            method: 'POST',
            data: { ...newIssue, createdBy: 'Anonymous' },
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },

    // getAllIssue: (projectId, status) => {
    //     return axios({
    //         url: `${API_URL}/task/get-all-by-project?projectId=${projectId}&status=${status}`,
    //         method: 'GET',
    //         headers: { 'authorization': 'Bearer ' + id_token }
    //     })
    // },

    updateIssue: (issueUpdate) => {
        return axios({
            url: `${API_URL}/issues`,
            method: 'PATCH',
            data: issueUpdate,
            headers: { 'authorization': 'Bearer ' + id_token }
        })
    },
}