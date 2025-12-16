import type { SubProblemByAlert } from "./SubProblemByAlert"

export default interface ProblemByAlert {
    id_disease: number
    content: string
    est_healing_time?: number
    status_disease?: boolean
    sub_disease?: Array<SubProblemByAlert>
  }