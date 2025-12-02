/* eslint-disable @typescript-eslint/no-unused-vars */

import type IProblemRepository from '../../domain/repositories/IProblemRepository'
import type SubProblem from '@/domain/entities/SubProblem'
import type ProblemPayload from '@/domain/entities/ProblemPayload'
import type Solution from '@/domain/entities/Solution'

export class ProblemRepositoryHttp implements IProblemRepository {
  constructor(
    private http: {
      get: (url: string) => Promise<ProblemPayload>
      getChildren: (url: string) => Promise<SubProblem[]>
      getSolutionsArray: (url: string) => Promise<Solution[]>
    },
  ) {}

  async getAll(
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload> {
    return await this.http.get(`http://localhost:3000/disease?page=${page}&limit=${limit}`)
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

  async getSolutionsArrayBySubProblemId(
    idSubProblem: number,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<Solution[]> {
    return await this.http.getSolutionsArray(`routeSolutionsList${idSubProblem}`)
  }
}
