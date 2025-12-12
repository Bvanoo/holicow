
import type ProblemByAlert from "./ProblemByAlert"

export default interface AlertWithProblem{
    id_warn: number
    warn_status: boolean
    warning_date: string
    id_animal: string
    id_troupeau: string
    disease: ProblemByAlert[]    
  }

