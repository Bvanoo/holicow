import type ProblemPayload from '../entities/ProblemPayload'
import type SubProblem from '../entities/SubProblem'
import type UpdateProblem from '../entities/updateProblem'
import type UpdateStatusProblem from '../entities/updateStatusProblem'
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

  async getSubProblemByProblemId(id: number): Promise<SubProblem[] | void> {
    return await this.repo
      .getAllSubProblemByProblemId(id, 1, 1, '', '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  // async getSolutionsArrayBySubProblemId(idSubProblem: number): Promise<Solution[] | void> {
  //   return await this.repo
  //     .getSolutionsArrayBySubProblemId(idSubProblem, 1, 1, '', '')
  //     .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  // }
  async getProblemById(id: number): Promise<ProblemPayload | void> {
    return await this.repo
      .getProblemById(id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  async updateProblem(
    role: string,
    id: string,
    updateProblem: UpdateProblem,
  ): Promise<UpdateProblem | void> {
    return await this.repo
      .updateProblem(role, id, updateProblem)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  async toggleProblemStatus(role: string, id: number): Promise<UpdateStatusProblem | void> {
    return await this.repo
      .toggleProblemStatut(role, id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
