/* eslint-disable @typescript-eslint/no-unused-vars */
import type CreateProblem from '../entities/createProblem'
import type Problem from '../entities/Problem'
import type ProblemPayload from '../entities/ProblemPayload'
import type SubProblem from '../entities/SubProblem'
import type SubProblemPayload from '../entities/SubProblemPayload'
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
      .catch((err) => console.error(err.message))
  }
  async getAllProblemsAdmin(page: number, limit: number, sortedBy: string, sortedOrder: string) {
    return await this.repo
      .getAllAdmin(Math.max(page, 1), Math.max(limit, 1), sortedBy || '', sortedOrder || '')
      .catch((err) => console.error(err.message))
  }
  async createProblem(role: string, object: CreateProblem) {
    return await this.repo.createProblem(role, object).catch((err) => console.error(err.message))
  }

  async updateProblem(role: string, id: string, updateProblem: UpdateProblemAdmin) {
    return await this.repo
      .updateProblem(role, id, updateProblem)
      .catch((err) => console.error(err.message))
  }
  async toggleProblemStatus(role: string, idProblem: string) {
    return await this.repo
      .toggleProblemStatus(role, idProblem)
      .catch((err) => console.error(err.message))
  }
}
