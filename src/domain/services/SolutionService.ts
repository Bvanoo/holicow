import type { SolveFromAlert } from '../entities/SolveFromAlert'
import type { updateStatusSolve } from '../entities/updateStatusSolve'
import { showSimpleErrorBox } from '../exception/utils'
import type { SolutionRepositoryHttp } from '@/dal/repositories/SolutionRepositoryHttp'

export class SolutionService {
  constructor(private repo: SolutionRepositoryHttp) {}

  async getAllSolution(page: number, limit: number) {
    return await this.repo.getAllSolution(page, limit)
  }

  async getSolutionsBySubProblemId(
    idSubProblem: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ) {
    return await this.repo
      .getSolutionsBySubProblemId(idSubProblem, page, limit, sortedBy, sortedOrder)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
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
  ) {
    return await this.repo
      .getSolutionsByProblemId(idProblem, lang, role, profilId, page, limit, sortedBy, sortedOrder)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  async getSolutionByProblemFromAlert(idProblem: string, lang: string, role: string, idUser: string | void | undefined){
    return await this.repo
    .getSolutionByProblemFromAlert(idProblem, lang, role, idUser)
    .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  async putStatusSolve(idWarn: string, solve: updateStatusSolve){
    return await this.repo
    .putStatusSolve(idWarn, solve)
    .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
