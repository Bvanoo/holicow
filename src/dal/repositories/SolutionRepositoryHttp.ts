/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ISolutionRepository } from '@/domain/repositories/ISolutionRepository'
import type SolutionPayload from '@/domain/entities/SolutionPayload'
import type ProblemPayload from '@/domain/entities/ProblemPayload'
import type Problem from '@/domain/entities/Problem'

export class SolutionRepositoryHttp implements ISolutionRepository {
  constructor(
    private http: {
      getSolutionsBySubProblemId: (url: string) => Promise<SolutionPayload>
      getAllSolution: (url: string) => Promise<SolutionPayload>
    },
  ) {}
  async getAllSolution(page: number, limit: number): Promise<SolutionPayload> {
    return await this.http.getAllSolution(
      `http://localhost:3000/solution?page=${page}&limit=${limit}`,
    )
  }
 

  async getSolutionsBySubProblemId(
    idSubProblem: number,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SolutionPayload> {
    console.log('')
    return await this.http.getSolutionsBySubProblemId(`routeSolutionsList${idSubProblem}`)
  }
}
