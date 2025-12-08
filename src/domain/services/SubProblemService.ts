import type { SubProblemRepositoryHttp } from '@/dal/repositories/SubProblemRepositoryHttp'
import type SubProblem from '../entities/SubProblem'
import { showSimpleErrorBox } from '../exception/utils'
import type UpdateStatusSubProblem from '../entities/updateStatusSubProblem'
import type UpdateSubProblem from '../entities/updateSubProblem'

export class SubProblemService {
  constructor(private repo: SubProblemRepositoryHttp) {}

  async getAllSubProblemByProblemId(id: string): Promise<SubProblem[] | void> {
    return await this.repo
      .getAllSubProblemByProblemId(id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  async toggleSubProblemStatus(role: string, id: number):Promise<UpdateStatusSubProblem | void>{
      return await this.repo
      .toggleSubProblemStatus(role, id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
    }
    async updateSubProblem(
        role: string,
        id: number,
        updateProblem: UpdateSubProblem,
      ): Promise<UpdateSubProblem | void> {
        return await this.repo
          .updateSubProblem(role, id, updateProblem)
          .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
      }
  }
  

