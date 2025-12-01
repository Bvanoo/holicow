import type SolutionsList from '../entities/SolutionsList'
import type SubProblem from '../entities/SubProblem'
import { showSimpleErrorBox } from '../exception/utils'
import type { ProblemRepositoryHttp } from '@/dal/repositories/ProblemRepositoryHttp'

export class ProblemService {
  constructor(private repo: ProblemRepositoryHttp) {}

  async getAllProblems(page: number, limit: number, sortedBy: string, sortedOrder: string) {
    return await this.repo
      .getAll(Math.max(page, 1), Math.max(limit, 1), sortedBy || '', sortedOrder || '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  async getSubProblemByProblemId(id: number): Promise<SubProblem[] | void> {
    return await this.repo
      .getAllSubProblemByProblemId(id, 1, 1, '', '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  async getSolutionsListBySubProblemId(idSubProblem: number): Promise<SolutionsList[] | void> {
    return await this.repo
      .getSolutionsListBySubProblemId(idSubProblem, 1, 1, '', '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
