import type Problem from './Problem'

export default interface ProblemPayload<P = Problem[]>{
  data: P
  total?: number
  page?: number
  totalPages?: number
}
