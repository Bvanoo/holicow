import type Problem from './Problem'
import type Solution from './Solution'
import type SubProblemAdmin from './SubProblemAdmin'

export default interface CreatedSolution {
  id_solve: number
  status_solve: boolean
  solutions: Solution
  diseases: Problem
  subDiseases?: SubProblemAdmin
}
