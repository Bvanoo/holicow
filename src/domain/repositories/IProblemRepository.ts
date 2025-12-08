import type CreateProblem from '../entities/createProblem'
import type Problem from '../entities/Problem'
import type ProblemPayload from '../entities/ProblemPayload'
import type SubProblemAdmin from '../entities/SubProblemAdmin'
import type SubProblemPayload from '../entities/SubProblemPayload'
// import type SubProblemPayload from '../entities/SubProblemPayload'

export default interface IProblemRepository {
  getAll(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload>

  getAllAdmin(
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<ProblemPayload>

  createProblem(role: string, object: CreateProblem): Promise<Problem>

  getAllSubProblemByProblemId(
    idProfile: string,
    idProblem: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblemPayload>

  getAllSubProblemByProblemIdAdmin(
    idProfile: string,
    idProblem: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SubProblemAdmin[]>
}
