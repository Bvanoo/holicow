import type SubProblem from "./SubProblem"

export default interface SubProblemPayload {
  data: SubProblem[]
  total?: number
  page?: number
  totalPages?: number
}
