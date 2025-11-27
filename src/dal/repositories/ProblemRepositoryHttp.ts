// src/api/infrastructure/repositories/UserRepositoryHttp.ts
import type IProblemRepository from '../../domain/repositories/IProblemRepository'
import type SubProblem from '@/domain/entities/SubProblem'
import type ProblemPayload from '@/domain/entities/ProblemPayload'

export class ProblemRepositoryHttp implements IProblemRepository {
  constructor(private http:
    {
      get: (url: string) => Promise<ProblemPayload>,
      getChildren: (url: string) => Promise<SubProblem[]>
    }
  ){}



  async getAll(
    page: number,
    limit: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sortedBy: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sortedOrder: string,
  ): Promise<ProblemPayload> {
    return await this.http.get(`http://localhost:3000/disease?page=${page}&limit=${limit}`)
  }

   async getAllSubProblemByProblemId(
    id: number,
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    page: number,
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit: number,
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sortedBy: string,
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sortedOrder: string): Promise<SubProblem[]> {
      return await this.http.getChildren(`http://localhost:3000/disease/${id}`)
    }
}
