/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ISolutionRepository } from '@/domain/repositories/ISolutionRepository'
import type SolutionPayload from '@/domain/entities/SolutionListPayload'
import type Solution from '@/domain/entities/Solution'

import type { SolutionBySubDisease } from '@/domain/entities/SolutionBySubDisease'
import type { SolveFromAlert } from '@/domain/entities/SolveFromAlert'
import type { updateStatusSolve } from '@/domain/entities/updateStatusSolve'

import type CreatedSolution from '@/domain/entities/CreatedSolution'
import type CreateSolution from '@/domain/entities/CreateSolution'
import type UpdateSolution from '@/domain/entities/UpdateSolution'
import type UpdatedSolution from '@/domain/entities/UpdatedSolution'

export class SolutionRepositoryHttp implements ISolutionRepository {
  constructor(
    private http: {
      get(url: string): Promise<Solution[]>
      getSolutionsBySubProblemId: (url: string) => Promise<Solution[]>
      getSolutionsByProblemId: (url: string) => Promise<Solution[]>
      getAllSolution: (url: string) => Promise<SolutionPayload>

      getSolutionByProblemFromAlert: (url: string) => Promise<SolutionBySubDisease>
      putStatusSolve: (url: string, object: updateStatusSolve) => Promise<SolveFromAlert>

      getSolutionById: (url: string) => Promise<Solution>
      createSolution: (url: string, newSolution: CreateSolution) => Promise<CreatedSolution>
      updateSolution: (url: string, newSolution: UpdateSolution) => Promise<UpdatedSolution>
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
      `http://localhost:3000/solution/subDiseaseSolution/${idSubProblem}?lang=${lang}&role=${role}&page=${page}&limit=${limit}&profilId=${profilId}`,
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
      `http://localhost:3000/solution/diseaseSolution/${idProblem}?lang=${lang}&role=${role}&profilId=${profilId}`,
    )
  }

  async getSolutionByProblemFromAlert(
    idProblem: string,
    lang: string,
    role: string,
    profilId: string | void | undefined,
    page: string,
    limit: string,
  ): Promise<SolutionBySubDisease> {
    return await this.http.getSolutionByProblemFromAlert(
      `http://localhost:3000/solution/subDiseaseSolution/${idProblem}?lang=${lang}&role=${role}&page=${page}&limit=${limit}&profilId=${profilId}`,
    )
  }

  async putStatusSolve(idWarn: string, data: updateStatusSolve): Promise<SolveFromAlert> {
    return await this.http.putStatusSolve(
      `http://localhost:3000/solve/addSolutions/${idWarn}`,
      data,
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
  async updateSolution(
    role: string,
    idSolution: number,
    updateSolution: UpdateSolution,
  ): Promise<UpdatedSolution> {
    return await this.http.updateSolution(
      `http://localhost:3000/solution/modify/${role}/${idSolution}`,
      updateSolution,
    )
  }
}
