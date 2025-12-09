import type CreateSubProblem from '../entities/createSubProblem'
import type SubProblemAdmin from '../entities/SubProblemAdmin'
import type SubProblemPayload from '../entities/SubProblemPayload'
import type UpdateStatusSubProblem from '../entities/updateStatusSubProblem'
import type UpdateSubProblemAdmin from '../entities/UpdateSubProblemAdmin'
export default interface ISubProblemRepository {
  toggleSubProblemStatus(role: string, id: number): Promise<UpdateStatusSubProblem>
  updateSubProblem(
    role: string,
    id: string,
    updateSubProblem: UpdateSubProblemAdmin,
  ): Promise<UpdateSubProblemAdmin>
  createSubProblem(role: string, createSubProblem: CreateSubProblem): Promise<CreateSubProblem>

  getAllSubProblemByProblemId(
    idProfile: string,
    idProblem: string,
    page: number,
    limit: number,
  ): Promise<SubProblemPayload>
  getAllSubProblemByProblemIdAdmin(
    // idProfile: string,
    idProblem: string,
    // page: number,
    // limit: number,
    // sortedBy: string,
    // sortedOrder: string,
  ): Promise<SubProblemAdmin[]>
}
