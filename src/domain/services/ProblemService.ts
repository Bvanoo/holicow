/* eslint-disable @typescript-eslint/no-unused-vars */
import type SubProblem from '../entities/SubProblem'
// import type SubProblemPayload from '../entities/SubProblemPayload'
import { showSimpleErrorBox } from '../exception/utils'
import type { ProblemRepositoryHttp } from '@/dal/repositories/ProblemRepositoryHttp'

export class ProblemService {
  constructor(private repo: ProblemRepositoryHttp) {}

  async getAllProblems(page: number, limit: number, sortedBy: string, sortedOrder: string) {
    return await this.repo
      .getAll(Math.max(page, 1), Math.max(limit, 1), sortedBy || '', sortedOrder || '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  async getSubProblemByProblemId(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblem[] | void> {
    return await this.repo
      .getAllSubProblemByProblemId(id, page, limit, '', '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
