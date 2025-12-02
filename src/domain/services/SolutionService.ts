import { showSimpleErrorBox } from '../exception/utils'
import type { SolutionRepositoryHttp } from '@/dal/repositories/SolutionRepositoryHttp'

export class SolutionService {
  constructor(private repo: SolutionRepositoryHttp) {}

  async getSolutionsBySubProblemId(
    idSubProblem: number,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ) {
    return await this.repo
      .getSolutionsBySubProblemId(idSubProblem, page, limit, sortedBy, sortedOrder)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
