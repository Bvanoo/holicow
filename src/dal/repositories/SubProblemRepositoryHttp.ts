import type CreateSubProblem from '@/domain/entities/createSubProblem'
import type SubProblem from '@/domain/entities/SubProblem'
import type SubProblemAdmin from '@/domain/entities/SubProblemAdmin'
import type UpdateStatusSubProblem from '@/domain/entities/updateStatusSubProblem'
import type ISubProblemRepository from '@/domain/repositories/ISubProblemRepository'
import type { UpdateVerb } from '../http/AxiosHttpClient'
import type UpdateSubProblemAdmin from '@/domain/entities/UpdateSubProblemAdmin'
import type SubProblemPayload from '@/domain/entities/SubProblemPayload'

export class SubProblemRepositoryHttp implements ISubProblemRepository {
  constructor(
    private http: {
      getChildren: (url: string) => Promise<SubProblem[]>
      toggleSubProblemStatut: (url: string) => Promise<UpdateStatusSubProblem>
      update: (
        url: string,
        updateProblem: UpdateSubProblemAdmin,
        uv: UpdateVerb,
      ) => Promise<UpdateSubProblemAdmin>
      create: (url: string, createSubProblem: CreateSubProblem) => Promise<CreateSubProblem>
      getAllSubProblemByProblemIdAdmin: (url: string) => Promise<SubProblemAdmin[]>
      getAllSubProblemByProblemId: (url: string) => Promise<SubProblemPayload>
    },
  ) {}
  async toggleSubProblemStatus(role: string, id: number): Promise<UpdateStatusSubProblem> {
    const url = `http://localhost:3000/subDisease/status/${id}?role=${role}`
    return await this.http.toggleSubProblemStatut(url)
  }
  async updateSubProblem(
    role: string,
    id: string,
    updateSubProblem: UpdateSubProblemAdmin,
  ): Promise<UpdateSubProblemAdmin> {
    const url = `http://localhost:3000/subDisease/save/${role}/${id}`
    return await this.http.update(url, updateSubProblem, 1 as UpdateVerb.patch)
  }
  async createSubProblem(
    role: string,
    createSubProblem: CreateSubProblem,
  ): Promise<CreateSubProblem> {
    const url = `http://localhost:3000/subDisease/create?role=${role}`
    return await this.http.create(url, createSubProblem)
  }

  async getAllSubProblemByProblemId(
    idProfile: string,
    idProblem: string,
    page: number,
    limit: number,
    // sortedBy: string,
    // sortedOrder: string,
  ): Promise<SubProblemPayload> {
    return await this.http.getAllSubProblemByProblemId(
      `http://localhost:3000/subDisease/stats/farmer/${idProfile}?page=${page}&limit=${limit}&diseaseId=${idProblem}`,
    )
  }
  async getAllSubProblemByProblemIdAdmin(
    // idProfile: string,
    idProblem: string,
    // page: number,
    // limit: number,
    // sortedBy: string,
    // sortedOrder: string,
  ): Promise<SubProblemAdmin[]> {
    return await this.http.getAllSubProblemByProblemIdAdmin(
      `http://localhost:3000/disease/${idProblem}`,
    )
  }
}
