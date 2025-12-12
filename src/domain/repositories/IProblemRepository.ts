import type CreateProblem from '../entities/createProblem'
import type Problem from '../entities/Problem'
import type ProblemPayload from '../entities/ProblemPayload'
import type ToggleProblem from '../entities/ToggleProblem'
import type UpdateProblemAdmin from '../entities/UpdateProblemAdmin'
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
  updateProblem(
    role: string,
    id: string,
    updateProblem: UpdateProblemAdmin,
  ): Promise<UpdateProblemAdmin>
  toggleProblemStatus(role: string, idProblem: string): Promise<ToggleProblem>
}
