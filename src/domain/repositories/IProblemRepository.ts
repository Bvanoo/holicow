import type CreateProblem from '../entities/createProblem'
import type Problem from '../entities/Problem'
import type ProblemPayload from '../entities/ProblemPayload'
import type UpdateProblem from '../entities/updateProblem'
// import type SubProblemPayload from '../entities/SubProblemPayload'

export default interface IProblemRepository {
  getAll(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload>
  createProblem(role: string, object: CreateProblem): Promise<Problem>

  getProblemById(id: number): Promise<ProblemPayload>

  updateProblem(role: string, id: string, updateProblem: UpdateProblem): Promise<Problem>
}
