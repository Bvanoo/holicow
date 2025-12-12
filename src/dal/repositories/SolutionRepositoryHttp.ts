/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ISolutionRepository } from '@/domain/repositories/ISolutionRepository'
import type SolutionPayload from '@/domain/entities/SolutionListPayload'
import type Solution from '@/domain/entities/Solution'
import type CreatedSolution from '@/domain/entities/CreatedSolution'
import type CreateSolution from '@/domain/entities/CreateSolution'

export class SolutionRepositoryHttp implements ISolutionRepository {
  constructor(
    private http: {
      get(url: string): Promise<Solution[]>
      getSolutionsBySubProblemId: (url: string) => Promise<Solution[]>
      getSolutionsByProblemId: (url: string) => Promise<Solution[]>
      getAllSolution: (url: string) => Promise<SolutionPayload>
      getSolutionById: (url: string) => Promise<Solution>
      createSolution: (url: string, newSolution: CreateSolution) => Promise<CreatedSolution>
    },
  ) {}
  async getAllSolution(page: number, limit: number): Promise<SolutionPayload> {
    return await this.http.getAllSolution(
      `http://localhost:3000/solution?page=${page}&limit=${limit}`,
    )
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
  ): Promise<Solution[]> {
    console.log('')
    return await this.http.getSolutionsBySubProblemId(
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
  ): Promise<Solution[]> {
    return await this.http.getSolutionsByProblemId(
      `http://localhost:3000/solution/disease-solution/${idProblem}?lang=${lang}&role=${role}&profilId=${profilId}`,
    )
  }
  async getSolutionById(id: string, lang: string): Promise<Solution> {
    return await this.http.getSolutionById(
      `http://localhost:3000/solution/comment/${id}?lang=${lang}`,
    )
  }
  async createSolution(
    role: string,
    lang: string,
    profilId: string,
    newSolution: CreateSolution,
  ): Promise<CreatedSolution> {
    return await this.http.createSolution(
      `http://localhost:3000/solution/create/${role}?lang=${lang}&profilId=${profilId}`,
      newSolution,
    )
  }
}
