import axios from 'axios'

const API_URL = 'http://localhost:1337'

// Create new goal
const createIssue = async (issueData, token) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}/issues`, issueData, config)

  return response.data
}

// Get user Issues
const getIssues = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/issues`, config)

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

const issueService = {
  createIssue,
  getIssues,
  deleteIssue,
}

export default issueService