import type { updateStatusSolve } from '@/domain/entities/updateStatusSolve'
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
  async getAlertById(url: string){
    const response = await axios.get(url)
    return response.data
  }

  async getSubProblemWithStat(url: string){
    const response = await axios.get(url)
    return response.data
  }
  async updateStatus(url: string){
    const response = await axios.put(url)
    return response.data
  }

  async getSolutionByProblemFromAlert(url: string){
    const response = await axios.get(url)
    return response.data
  }

  async putStatusSolve(url: string,  object: updateStatusSolve){
    const response = await axios.put(url, object)
    return response.data
  }
}
