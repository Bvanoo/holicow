// src/api/infrastructure/repositories/UserRepositoryHttp.ts
import type { IProblemRepository } from '../../domain/repositories/ISubProblemRepository'
import type ProblemPayload from '@/domain/entities/ProblemPayload'

export class ProblemRepositoryHttp implements IProblemRepository {
  constructor(private http: { get: (url: string) => Promise<ProblemPayload> }) {}

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
}
