import type { SolutionBySubDisease } from '../entities/SolutionBySubDisease'
import type Solution from '../entities/Solution'
import type SolutionPayload from '../entities/SolutionListPayload'
import type { SolveFromAlert } from '../entities/SolveFromAlert'
import type { updateStatusSolve } from '../entities/updateStatusSolve'

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
  ): Promise<Solution[]>

  getSolutionByProblemFromAlert(
    idProblem: string,
    lang: string,
    role: string,
    profilId: string | void | undefined,
    limit: string,
    page: string,
  ): Promise<SolutionBySubDisease>
  putStatusSolve(idWarn: string, data: updateStatusSolve): Promise<SolveFromAlert>

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
