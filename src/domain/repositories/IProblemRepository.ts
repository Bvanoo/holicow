import type Problem from '../entities/Problem'
import type ProblemPayload from '../entities/ProblemPayload'
// import type SubProblemPayload from '../entities/SubProblemPayload'

export default interface IProblemRepository {
  getAll(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload>
  createProblem(role: string, object: Problem): Promise<Problem>
}
