/* eslint-disable @typescript-eslint/no-unused-vars */
import type CreateProblem from '../entities/createProblem'
import type Problem from '../entities/Problem'
import type ProblemPayload from '../entities/ProblemPayload'
import type SubProblem from '../entities/SubProblem'
import type SubProblemAdmin from '../entities/SubProblemAdmin'
import type SubProblemPayload from '../entities/SubProblemPayload'
import type UpdateProblemAdmin from '../entities/UpdateProblemAdmin'
// import type SubProblemPayload from '../entities/SubProblemPayload'
import { showSimpleErrorBox } from '../exception/utils'
import type { ProblemRepositoryHttp } from '@/dal/repositories/ProblemRepositoryHttp'

export class ProblemService {
  constructor(private repo: ProblemRepositoryHttp) {}

  async getAllProblems(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ) {
    return await this.repo
      .getAll(id, Math.max(page, 1), Math.max(limit, 1), sortedBy || '', sortedOrder || '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  async getAllProblemsAdmin(page: number, limit: number, sortedBy: string, sortedOrder: string) {
    return await this.repo
      .getAllAdmin(Math.max(page, 1), Math.max(limit, 1), sortedBy || '', sortedOrder || '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  async createProblem(role: string, object: CreateProblem) {
    return await this.repo
      .createProblem(role, object)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  async updateProblem(role: string, id: string, updateProblem: UpdateProblemAdmin) {
    return await this.repo.updateProblem(role, id, updateProblem)
  }
}
