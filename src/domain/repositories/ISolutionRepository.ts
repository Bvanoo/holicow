import type SolutionPayload from '../entities/SolutionPayload'

export interface ISolutionRepository {
  getAllSolution(page: number, limit: number): Promise<SolutionPayload>
  getSolutionsBySubProblemId(
    idSubProblem: number,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SolutionPayload>
}
