/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SubProblemRepositoryHttp } from '@/dal/repositories/SubProblemRepositoryHttp'
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
import type UpdateSubProblem from '../entities/updateSubProblem'
import type UpdateSubProblemAdmin from '../entities/UpdateSubProblemAdmin'
import type CreateSubProblem from '../entities/createSubProblem'

export class SubProblemService {
  constructor(private repo: SubProblemRepositoryHttp) {}

  async getSubProblemByProblemId(
    idProfile: string,
    idProblem: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblemPayload | void> {
    return await this.repo
      .getAllSubProblemByProblemId(idProfile, idProblem, page, limit)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  async getSubProblemByProblemIdAdmin(
    // idProfile: string,
    idProblem: string,
    // page: number,
    // limit: number,
    // sortedBy: string,
    // sortedOrder: string,
  ): Promise<SubProblemAdmin[] | void> {
    return await this.repo
      .getAllSubProblemByProblemIdAdmin(idProblem /*, page, limit, '', ''*/)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  async updateSubProblem(role: string, id: string, updateProblem: UpdateSubProblemAdmin) {
    return await this.repo.updateSubProblem(role, id, updateProblem)
  }
  async createSubProblem(role: string, createSubProblem: CreateSubProblem) {
    return await this.repo.createSubProblem(role, createSubProblem)
  }
}
