import type CreateSolution from '@/domain/entities/CreateSolution'
import type UpdateSolution from '@/domain/entities/UpdateSolution'
import axios from 'axios'

export enum UpdateVerb {
  put,
  patch,
}
export class AxiosHttpClient {
  async get(url: string) {
    const response = await axios.get(url)
    return response.data
  }

  async getChildren(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async update(url: string, object: Record<string, unknown>, updateVerb: UpdateVerb) {
    let response = null

    switch (updateVerb) {
      case UpdateVerb.patch:
        response = await axios.patch(url, object)
        break

      case UpdateVerb.put:
        response = await axios.put(url, object)
        break
    }
    if (!response.data) throw new Error('Axios error : ' + updateVerb)
    return response.data
  }

  async create(url: string, object: Record<string, unknown>) {
    const response = await axios.post(url, object)
    return response.data
  }
  async createSolution(url: string, object: CreateSolution) {
    const response = await axios.post(url, object)
    return response.data
  }
  async updateSolution(url: string, object: UpdateSolution) {
    const response = await axios.patch(url, object)
    return response.data
  }

  async delete(url: string) {
    const response = await axios.delete(url)
    return { status: response.status }
  }

  async approve(url: string, object: Record<string, unknown>) {
    const response = await axios.post(url, object)
    return response.data
  }
  async getAllSolution(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async getSolutionsBySubProblemId(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async getSolutionsByProblemId(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async getSolutionById(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async getAllSubProblemByProblemIdAdmin(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async getAllSubProblemByProblemId(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async toggleProblemStatus(url: string) {
    const response = await axios.patch(url)
    return response.data
  }
  async toggleSubProblemStatus(url: string) {
    const response = await axios.patch(url)
    return response.data
  }

  async getAllAlertsByUserId(url: string) {
    const response = await axios.get(url)
    return response.data
  }
  async getCommentBySolutionId(url: string) {
    const response = await axios.get(url)
    return response.data
  }
}
