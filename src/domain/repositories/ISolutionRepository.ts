import type SolutionPayload from '../entities/SolutionListPayload'

export interface ISolutionRepository {
  getAllSolution(page: number, limit: number): Promise<SolutionPayload>
  getSolutionsBySubProblemId(
    idSubProblem: string,
    lang: string,
    role: string,
    profilId: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SolutionPayload>
}
