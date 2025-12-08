import axios from 'axios'

export class AxiosHttpClient {
  async get(url: string) {
    const response = await axios.get(url)
    return response.data
  }

  async getChildren(url: string) {
    const response = await axios.get(url)
    return response.data
  }

  async update(url: string, object: Record<string, unknown>) {
    const reponse = await axios.patch(url, object)
    return reponse.data
  }

  async create(url: string, object: Record<string, unknown>) {
    const reponse = await axios.post(url, object)
    return reponse.data
  }

  async toggleProblemStatut(url: string) {
    const reponse = await axios.patch(url)
    return reponse.data
  }
  async toggleSubProblemStatut(url: string) {
    const reponse = await axios.patch(url)
    return reponse.data
  }

  async getAllSolution(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async getSolutionsBySubProblemId(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async getAllAlertsByUserId(url: string) {
    const response = await axios.get(url)
    return response.data
  }
}
