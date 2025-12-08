import type ProblemPayload from '../entities/ProblemPayload'
import type SubProblem from '../entities/SubProblem'
import type UpdateProblem from '../entities/updateProblem'
export default interface IProblemRepository {
  getAll(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload>

  getProblemById(id: number): Promise<ProblemPayload>

  getAllSubProblemByProblemId(
    id: number,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblem[]>
  updateProblem(role: string, id: string, updateProblem: UpdateProblem): Promise<UpdateProblem>
}
