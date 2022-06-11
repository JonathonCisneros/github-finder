import axios from 'axios'

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
