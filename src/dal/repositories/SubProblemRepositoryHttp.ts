import type CreateSubProblem from '@/domain/entities/createSubProblem'
import type SubProblem from '@/domain/entities/SubProblem'
import type ISubProblemRepository from '@/domain/repositories/ISubProblemRepository'
import type { UpdateVerb } from '../http/AxiosHttpClient'
import type UpdateSubProblemAdmin from '@/domain/entities/UpdateSubProblemAdmin'
import type SubProblemPayload from '@/domain/entities/SubProblemPayload'
import type ToggleSubProblem from '@/domain/entities/ToggleSubProblem'
import type SubProblemPayloadAdmin from '@/domain/entities/SubProblemPayloadAdmin'

export class SubProblemRepositoryHttp implements ISubProblemRepository {
  constructor(
    private http: {
      getChildren: (url: string) => Promise<SubProblem[]>
      update: (
        url: string,
        updateProblem: UpdateSubProblemAdmin,
        uv: UpdateVerb,
      ) => Promise<UpdateSubProblemAdmin>
      create: (url: string, createSubProblem: CreateSubProblem) => Promise<CreateSubProblem>
      getAllSubProblemByProblemIdAdmin: (url: string) => Promise<SubProblemPayloadAdmin>
      getAllSubProblemByProblemId: (url: string) => Promise<SubProblemPayload>
      toggleSubProblemStatus: (url: string) => Promise<ToggleSubProblem>
    },
  ) {}
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
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblemPayloadAdmin> {
    return await this.http.getAllSubProblemByProblemIdAdmin(
      `http://localhost:3000/disease/${idProblem}?page=${page}&limit=${limit}`,
    )
  }
  async toggleSubProblemStatus(
    role: string,
    idProblem: string,

    // page: number,
    // limit: number,
    // sortedBy: string,
    // sortedOrder: string,
  ): Promise<ToggleSubProblem> {
    return await this.http.toggleSubProblemStatus(
      `http://localhost:3000/subDisease/status/${idProblem}?role=${role}`,
    )
  }
}
