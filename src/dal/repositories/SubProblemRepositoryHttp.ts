import type CreateSubProblem from '@/domain/entities/createSubProblem'
import type SubProblem from '@/domain/entities/SubProblem'
import type UpdateStatusSubProblem from '@/domain/entities/updateStatusSubProblem'
import type UpdateSubProblem from '@/domain/entities/updateSubProblem'
import type ISubProblemRepository from '@/domain/repositories/ISubProblemRepository'

export class SubProblemRepositoryHttp implements ISubProblemRepository {
  constructor(
    private http: {
      getChildren: (url: string) => Promise<SubProblem[]>
      toggleSubProblemStatut: (url: string) => Promise<UpdateStatusSubProblem>
      update: (url: string, updateProblem: UpdateSubProblem) => Promise<UpdateSubProblem>
      create: (url: string, createSubProblem: CreateSubProblem) => Promise<CreateSubProblem>
    },
  ) {}
  async toggleSubProblemStatus(role: string, id: number): Promise<UpdateStatusSubProblem> {
    const url = `http://localhost:3000/subDisease/status/${id}?role=${role}`
    return await this.http.toggleSubProblemStatut(url)
  }
  async updateSubProblem(
    role: string,
    id: number,
    updateSubProblem: UpdateSubProblem,
  ): Promise<UpdateSubProblem> {
    const url = `http://localhost:3000/subDisease/save/${role}/${id}`
    return await this.http.update(url, updateSubProblem)
  }
  async createSubProblem(role: string, createSubProblem: CreateSubProblem) {
    const url = `http://localhost:3000/subDisease/create?role=${role}`
    return await this.http.create(url, createSubProblem)
  }

  async getAllSubProblemByProblemId(id: string): Promise<SubProblem[]> {
    return await this.http.getChildren(`http://localhost:3000/disease/${id}`)
  }
}
