/* eslint-disable @typescript-eslint/no-unused-vars */

import type IProblemRepository from '../../domain/repositories/IProblemRepository'
import type SubProblem from '@/domain/entities/SubProblem'
import type ProblemPayload from '@/domain/entities/ProblemPayload'
import type UpdateProblem from '@/domain/entities/updateProblem'
import type UpdateStatusProblem from '@/domain/entities/updateStatusProblem'

export class ProblemRepositoryHttp implements IProblemRepository {
  constructor(
    private http: {
      get: (url: string) => Promise<ProblemPayload>
      getChildren: (url: string) => Promise<SubProblem[]>
      update: (url: string, updateProblem: UpdateProblem) => Promise<UpdateProblem>
      toggleProblemStatut: (url: string) => Promise<UpdateStatusProblem>
    },
  ) {}

  async getAll(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload> {
    return await this.http.get(`http://localhost:3000/disease/stats/farmer/${id}`)
  }

  async getAllSubProblemByProblemId(
    id: number,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblem[]> {
    return await this.http.getChildren(`http://localhost:3000/disease/${id}`)
  }

  async getProblemById(id: number): Promise<ProblemPayload> {
    const url = `http://localhost:3000/disease/${id}`
    return await this.http.get(url)
  }

  async updateProblem(
    role: string,
    id: string,
    updateProblem: UpdateProblem,
  ): Promise<UpdateProblem> {
    const url = `http://localhost:3000/disease/save/${role}/${id}`
    return await this.http.update(url, updateProblem)
  }

  async toggleProblemStatut(role: string, id: number): Promise<UpdateStatusProblem> {
    const url = `http://localhost:3000/disease/status/${role}/${id}`
    return await this.http.toggleProblemStatut(url)
  }
}
