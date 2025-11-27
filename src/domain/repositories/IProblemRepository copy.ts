import type ProblemPayload from '../entities/ProblemPayload'

export interface IProblemRepository {
  getAll(
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload>
}
