import axios from 'axios'

const API_URL = 'http://localhost:1337'

// Create new goal
const createIssue = async (issueData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}/issues`, issueData, config)

  return response.data
}

// Get user Issues
const getIssues = async (token, projectId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/issues/${projectId}/listIssue`, config)

  return response.data
}

// Delete user Issue
const deleteIssue = async (issueId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`${API_URL}/issues/${issueId}`, config)

  return response.data
}
const updateIssue = async (dataUpdate, issueId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(`${API_URL}/issues/${issueId}`,dataUpdate, config)

  return response.data
}
const searchIssue = async (dataSearch,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/projects/${dataSearch.id}/issues/search?q=${dataSearch.title}`, config)

  return response.data
}

const issueService = {
  createIssue,
  getIssues,
  deleteIssue,
  updateIssue,
  searchIssue
}

export default issueService