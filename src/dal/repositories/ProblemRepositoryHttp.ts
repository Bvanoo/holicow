/* eslint-disable @typescript-eslint/no-unused-vars */

import type IProblemRepository from '../../domain/repositories/IProblemRepository'
import type SubProblem from '@/domain/entities/SubProblem'
import type ProblemPayload from '@/domain/entities/ProblemPayload'
import type Solution from '@/domain/entities/Solution'
import type SubProblemPayload from '@/domain/entities/SubProblemPayload'
import type Problem from '@/domain/entities/Problem'
import type CreateProblem from '@/domain/entities/createProblem'
import type SubProblemAdmin from '@/domain/entities/SubProblemAdmin'

export class ProblemRepositoryHttp implements IProblemRepository {
  constructor(
    private http: {
      get: (url: string) => Promise<ProblemPayload>
      getChildren: (url: string) => Promise<SubProblemPayload>
      getAllSubProblemByProblemIdAdmin: (url: string) => Promise<SubProblemAdmin[]>
      create: (url: string, object: Record<string, unknown>) => Promise<Problem>
    },
  ) {}

  async getAll(
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
  }
  async getAllSubProblemByProblemIdAdmin(
    // idProfile: string,
    idProblem: string,
    // page: number,
    // limit: number,
    // sortedBy: string,
    // sortedOrder: string,
  ): Promise<SubProblemAdmin[]> {
    return await this.http.getAllSubProblemByProblemIdAdmin(
      `http://localhost:3000/disease/${idProblem}`,
    )
  }
}
