import type SubProblem from './SubProblem'

export interface SolutionBySubDisease extends Record<string, unknown> {
  id_solution: number
  status_solution: boolean
  solution_description_FR: string
  solution_description_NL: string
  solution_description_EN: string
  solution_description_DE: string
  solves: [
    {
      id_solve: number
      status_solve: boolean
      subDiseases: SubProblem
      comments: []
    },
  ]
  commentCount: number
  farmerAlertCount: number
  similarAvatarAlertCount: number
}
