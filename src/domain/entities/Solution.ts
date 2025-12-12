import type Solve from './Solve'

export default interface Solution extends Record<string, unknown> {
  commentCount?: number
  farmerAlertCount?: number
  id_solution: number
  similarAvatarAlertCount?: number
  solution_description_DE: string
  solution_description_EN: string
  solution_description_FR: string
  solution_description_NL: string
  status_solution: boolean
  solves?: Solve[]
  // id_solution: number
  // content: string
  // status_solution: boolean
  // farmerStats: FarmerStats
}
