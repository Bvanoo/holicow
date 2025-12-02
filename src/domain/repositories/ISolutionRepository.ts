import type SolutionPayload from '../entities/SolutionPayload'

export interface ISolutionRepository {
  getSolutionsBySubProblemId(
    idSubProblem: number,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SolutionPayload>
}
