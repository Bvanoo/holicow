/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ISolutionRepository } from '@/domain/repositories/ISolutionRepository'
import type SolutionPayload from '@/domain/entities/SolutionListPayload'
import type Solution from '@/domain/entities/Solution'

export class SolutionRepositoryHttp implements ISolutionRepository {
  constructor(
    private http: {
      get: (url: string) => Promise<SolutionPayload>
    },
  ) {}
  async getAllSolution(page: number, limit: number): Promise<SolutionPayload> {
    return await this.http.get(`http://localhost:3000/solution?page=${page}&limit=${limit}`)
  }

  async getSolutionsBySubProblemId(
    idSubProblem: string,
    lang: string,
    role: string,
    profilId: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SolutionPayload> {
    console.log('')
    return await this.http.get(
      `http://localhost:3000/solution/subDisease-solution/${idSubProblem}?lang=${lang}&role=${role}`,
    )
  }
  async getSolutionsByProblemId(
    idProblem: string,
    lang: string,
    role: string,
    profilId: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SolutionPayload> {
    return await this.http.get(
      `http://localhost:3000/solution/disease-solution/${idProblem}?lang=${lang}&role=${role}&profilId=${profilId}`,
    )
  }
}
