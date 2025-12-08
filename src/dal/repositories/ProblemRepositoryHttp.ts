/* eslint-disable @typescript-eslint/no-unused-vars */

import type IProblemRepository from '../../domain/repositories/IProblemRepository'
import type SubProblem from '@/domain/entities/SubProblem'
import type ProblemPayload from '@/domain/entities/ProblemPayload'
import type Solution from '@/domain/entities/Solution'
import type SubProblemPayload from '@/domain/entities/SubProblemPayload'
import type Problem from '@/domain/entities/Problem'
import type CreateProblem from '@/domain/entities/createProblem'

export class ProblemRepositoryHttp implements IProblemRepository {
  constructor(
    private http: {
      get: (url: string) => Promise<ProblemPayload>
      getChildren: (url: string) => Promise<SubProblem[]>
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
  async createProblem(role: string, object: CreateProblem): Promise<Problem> {
    return await this.http.create(`http://localhost:3000/disease/create?role=${role}`, object)
  }

  async getAllSubProblemByProblemId(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblem[]> {
    return await this.http.getChildren(`http://localhost:3000/disease/${id}`)
  }
}
