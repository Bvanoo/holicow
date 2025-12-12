import type { Extended } from "./BaseType"

export type SolutionId = string

export type Solution = {id?:SolutionId, status_solution:boolean}

// DTO/extensible (peut contenir plus de champs)
export type SolutionDTO = Extended<Solution>
