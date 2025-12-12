import type { SolutionBySubDisease } from '../entities/SolutionBySubDisease'
import type Solution from '../entities/Solution'
import type SolutionPayload from '../entities/SolutionListPayload'
import type { SolveFromAlert } from '../entities/SolveFromAlert'

export interface ISolutionRepository {
  getAllSolution(page: number, limit: number): Promise<SolutionPayload>

  getSolutionsBySubProblemId(
    idSubProblem: string,
    lang: string,
    role: string,
    profilId: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,

  ): Promise<SolutionPayload>
  getSolutionByProblemFromAlert(idProblem: string, lang: string, role: string, idUser: string| void | undefined): Promise<SolutionBySubDisease>
  putStatusSolve(idWarn: string) : Promise<SolveFromAlert>

  getSolutionsByProblemId(
    idProblem: string,
    lang: string,
    role: string,
    profilId: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<Solution[]>
  getSolutionById(id: string, lang: string): Promise<Solution>

}
