import type SubProblem from '../entities/SubProblem'
import type UpdateSubProblem from '../entities/updateSubProblem'
export default interface ISubProblemRepository {
  getAllSubProblemByProblemId(id: string): Promise<SubProblem[]>
  updateSubProblem(role: string, id: number, updateSubProblem: UpdateSubProblem): Promise<UpdateSubProblem>

}
