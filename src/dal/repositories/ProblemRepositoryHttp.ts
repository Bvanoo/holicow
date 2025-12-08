/* eslint-disable @typescript-eslint/no-unused-vars */

import type IProblemRepository from '../../domain/repositories/IProblemRepository'
import type SubProblem from '@/domain/entities/SubProblem'
import type ProblemPayload from '@/domain/entities/ProblemPayload'
import type Problem from '@/domain/entities/Problem'
import type CreateProblem from '@/domain/entities/createProblem'
import type UpdateProblem from '@/domain/entities/updateProblem'

export class ProblemRepositoryHttp implements IProblemRepository {
  constructor(
    private http: {
      get: (url: string) => Promise<ProblemPayload>
      getChildren: (url: string) => Promise<SubProblemPayload>
      create: (url: string, object: Record<string, unknown>) => Promise<Problem>
      update: (url: string, updateProblem: UpdateProblem) => Promise<UpdateProblem>
    },
  ) {}

  async getAllFarmer(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload> {
    return await this.http.get(
      `http://localhost:3000/disease/stats/farmer/${id}?page=${page}&limit=${limit}`,
    )
  }
  async getAllAdmin(
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload> {
    return await this.http.get(
      `http://localhost:3000/disease?page=${page}&limit=${limit}&role=admin`,
    )
  }
  async createProblem(role: string, object: CreateProblem): Promise<Problem> {
    return await this.http.create(`http://localhost:3000/disease/create?role=${role}`, object)
  }

  async getAllSubProblemByProblemId(
    idProfile: string,
    idProblem: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblemPayload> {
    return await this.http.getChildren(
      `http://localhost:3000/subDisease/stats/farmer/${idProfile}?page=${page}&limit=${limit}&diseaseId=${idProblem}`,
    )
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

  async createProblem(role: string, object: CreateProblem): Promise<Problem> {
    return await this.http.create(`http://localhost:3000/disease/create?role=${role}`, object)
  }
}
