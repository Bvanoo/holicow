import type Solve from './Solve'

export interface SubProblemByAlert extends Record<string, unknown> {
  id_sub_disease: number
  content: string
  status_sub_disease: boolean
  solve: Solve[]
  totalComments: number
  totalAlerts: number
  totalSimilarAvatarAlerts: number
}
