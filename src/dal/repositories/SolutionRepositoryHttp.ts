/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ISolutionRepository } from '@/domain/repositories/ISolutionRepository'
import type SolutionPayload from '@/domain/entities/SolutionPayload'

export class SolutionRepositoryHttp implements ISolutionRepository {
  constructor(
    private http: {
      getSolutionsBySubProblemId: (url: string) => Promise<SolutionPayload>
    },
  ) {}

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
