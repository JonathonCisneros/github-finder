import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token: ${GITHUB_TOKEN}` },
})

/***** Get users via search *****/
export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text })

  const response = await axios.get(`/api/searchUsers?${params}`)
  return response.data
}

/***** Get user and repos *****/
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({ q: login })

  const response = await axios.get(`/api/getUserAndRepos?${params}`)
  return response.data
}

/***** Get repo commits data *****/
export const getBranchesAndCommits = async (login, repo) => {
  const params = new URLSearchParams({ login, repo })

  const response = await axios.get(`/api/getBranchesAndCommits?${params}`)
  return response.data
}
