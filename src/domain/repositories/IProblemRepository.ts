import type ProblemPayload from '../entities/ProblemPayload'
import type SubProblem from '../entities/SubProblem'
// import type SubProblemPayload from '../entities/SubProblemPayload'

export default interface IProblemRepository {
  getAll(
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload>

  getAllSubProblemByProblemId(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblem[]>
}
