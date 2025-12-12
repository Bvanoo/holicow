/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ISolutionRepository } from '@/domain/repositories/ISolutionRepository'
import type SolutionPayload from '@/domain/entities/SolutionListPayload'
import type Solution from '@/domain/entities/Solution'
import type { SolutionBySubDisease } from '@/domain/entities/SolutionBySubDisease'
import type { SolveFromAlert } from '@/domain/entities/SolveFromAlert'
import type { updateStatusSolve } from '@/domain/entities/updateStatusSolve'

export class SolutionRepositoryHttp implements ISolutionRepository {
  constructor(
    private http: {
      get(url: string): Promise<Solution[]>
      getSolutionsBySubProblemId: (url: string) => Promise<SolutionPayload>
      getAllSolution: (url: string) => Promise<SolutionPayload>
      getSolutionByProblemFromAlert:(url: string) => Promise<SolutionBySubDisease>
      putStatusSolve:(url: string, object: updateStatusSolve) => Promise<SolveFromAlert>
    },
  ) {}
  async getAllSolution(page: number, limit: number): Promise<SolutionPayload> {
    return await this.http.getAllSolution(
      `http://localhost:3000/solution?page=${page}&limit=${limit}`,
    )
  }

  async getSolutionsBySubProblemId(
    idSubProblem: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SolutionPayload> {
    console.log('')
    return await this.http.getSolutionsBySubProblemId(`routeSolutionsList${idSubProblem}`)
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
    return await this.http.get(
      `http://localhost:3000/solution/disease-solution/${idProblem}?lang=${lang}&role=${role}&profilId=${profilId}`,
    )
  }

  async getSolutionByProblemFromAlert(idProblem: string, lang: string, role: string, idUser: string| void | undefined): Promise<SolutionBySubDisease>{
    return await this.http.get(
      `http://localhost:3000/solution/subDisease-solution/${idProblem}?lang=${lang}&role=${role}&profilId=${idUser}`
    )
  }

  async putStatusSolve(idWarn: string, data: updateStatusSolve): Promise<SolveFromAlert>{
    return await this.http.putStatusSolve(
      `http://localhost:3000/solve/addSolutions/${idWarn}`, data
    )
  }

}
