import type Solve from './Solve'

export default interface UpdatedSolution {
  id_solution: number
  status_solution: boolean
  solution_description_FR: string
  solution_description_NL: string
  solution_description_EN: string
  solution_description_DE: string
  solves: Solve[]
}
