import type { SubProblemRepositoryHttp } from '@/dal/repositories/SubProblemRepositoryHttp'
import type SubProblemPayload from '../entities/SubProblemPayload'
// import type SubProblemPayload from '../entities/SubProblemPayload'
import type UpdateSubProblemAdmin from '../entities/UpdateSubProblemAdmin'
import type CreateSubProblem from '../entities/createSubProblem'
import type SubProblemPayloadAdmin from '../entities/SubProblemPayloadAdmin'

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
      .catch((err) => console.error(err.message))
  }
  async getSubProblemByProblemIdAdmin(
    // idProfile: string,
    idProblem: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblemPayloadAdmin | void> {
    return await this.repo
      .getAllSubProblemByProblemIdAdmin(idProblem, page, limit, sortedBy, sortedOrder)
      .catch((err) => console.error(err.message))
  }

  async updateSubProblem(role: string, id: string, updateProblem: UpdateSubProblemAdmin) {
    return await this.repo.updateSubProblem(role, id, updateProblem)
  }
  async createSubProblem(role: string, createSubProblem: CreateSubProblem) {
    return await this.repo.createSubProblem(role, createSubProblem)
  }
  async toggleSubProblemStatus(role: string, idSubProblem: string) {
    return await this.repo.toggleSubProblemStatus(role, idSubProblem)
  }
}
