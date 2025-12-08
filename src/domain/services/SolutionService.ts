import { showSimpleErrorBox } from '../exception/utils'
import type { SolutionRepositoryHttp } from '@/dal/repositories/SolutionRepositoryHttp'

export class SolutionService {
  constructor(private repo: SolutionRepositoryHttp) {}

  async getAllSolution(page: number, limit: number) {
    return await this.repo.getAllSolution(page, limit)
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
  ) {
    return await this.repo
      .getSolutionsBySubProblemId(
        idSubProblem,
        lang,
        role,
        profilId,
        page,
        limit,
        sortedBy,
        sortedOrder,
      )
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
}
