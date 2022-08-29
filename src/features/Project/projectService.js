import axios from  'axios'

const API_URL = 'http://localhost:1337'

const createProject = async (projectData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/projects`, projectData, config)
    return response.data

}
const updateProject = async (projectData, token, id)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = projectData.dataProject
    const response = await axios.patch(`${API_URL}/projects/${id}`, data, config)
    return response.data

}
const getProject = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/projects`, config)
    return response.data
}
const getProjectById = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/projects/${id}`, config)
    return response.data
}
const deleteProject = async (projectId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(`${API_URL}/projects/${projectId}`, config)
  
    return response.data
  }

const  projectService= {
    createProject,
    getProject,
    getProjectById,
    updateProject,
    deleteProject
}
export default projectService