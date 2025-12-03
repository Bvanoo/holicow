import type ProblemPayload from '../entities/ProblemPayload'
import type SubProblem from '../entities/SubProblem'

export default interface IProblemRepository {
  getAll(
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload>

  getAllSubProblemByProblemId(
    id: number,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblem[]>
}
