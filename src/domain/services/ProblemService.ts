import type Problem from '../entities/Problem'
import type ProblemPayload from '../entities/ProblemPayload'
import type Solution from '../entities/Solution'
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
  async getSolutionsArrayBySubProblemId(idSubProblem: number): Promise<Solution[] | void> {
    return await this.repo
      .getSolutionsArrayBySubProblemId(idSubProblem, 1, 1, '', '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  async getProblemById(id: number): Promise<ProblemPayload<Problem> | void>{
    return await this.repo
    .getProblemById(id)
    .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))  }
}
