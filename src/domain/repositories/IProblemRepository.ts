import type { promises } from 'dns'
import type ProblemPayload from '../entities/ProblemPayload'
import type SubProblem from '../entities/SubProblem'
import type Problem from '../entities/Problem'

export default interface IProblemRepository {
  getAll(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload>

  getProblemById(
    id:number
  ):Promise<ProblemPayload<Problem>>

  getAllSubProblemByProblemId(
    id: number,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblem[]>
}
