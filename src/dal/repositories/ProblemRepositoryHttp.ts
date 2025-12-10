/* eslint-disable @typescript-eslint/no-unused-vars */

import type IProblemRepository from '../../domain/repositories/IProblemRepository'
import type SubProblem from '@/domain/entities/SubProblem'
import type ProblemPayload from '@/domain/entities/ProblemPayload'
import type Solution from '@/domain/entities/Solution'
import type SubProblemPayload from '@/domain/entities/SubProblemPayload'
import type Problem from '@/domain/entities/Problem'
import type CreateProblem from '@/domain/entities/createProblem'
import type SubProblemAdmin from '@/domain/entities/SubProblemAdmin'
import type UpdateProblemAdmin from '@/domain/entities/UpdateProblemAdmin'
import type { UpdateVerb } from '../http/AxiosHttpClient'
import type ToggleProblem from '@/domain/entities/ToggleProblem'

export class ProblemRepositoryHttp implements IProblemRepository {
  constructor(
    private http: {
      get: (url: string) => Promise<ProblemPayload>
      getChildren: (url: string) => Promise<SubProblemPayload>
      create: (url: string, object: Record<string, unknown>) => Promise<Problem>
      update: (
        url: string,
        updateProblem: UpdateProblemAdmin,
        uv: UpdateVerb,
      ) => Promise<UpdateProblemAdmin>
      toggleProblemStatus: (url: string) => Promise<ToggleProblem>
    },
  ) {}

  async getAll(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload> {
    return await this.http.get(
      `http://localhost:3000/disease/stats/farmer/${id}?page=${page}&limit=${limit}`,
    )
  }
  async getAllAdmin(
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload> {
    return await this.http.get(
      `http://localhost:3000/disease?page=${page}&limit=${limit}&role=admin`,
    )
  }
  async createProblem(role: string, object: CreateProblem): Promise<Problem> {
    return await this.http.create(`http://localhost:3000/disease/create?role=${role}`, object)
  }

  async updateProblem(
    role: string,
    id: string,
    updateProblem: UpdateProblemAdmin,
  ): Promise<UpdateProblemAdmin> {
    const url = `http://localhost:3000/disease/save/${role}/${id}`
    return await this.http.update(url, updateProblem, 1 as UpdateVerb.patch)
  }
  async toggleProblemStatus(role: string, idProblem: string): Promise<ToggleProblem> {
    return await this.http.toggleProblemStatus(
      `http://localhost:3000/disease/status/${role}/${idProblem}`,
    )
  }
}
