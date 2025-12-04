import type Solution from './Solution'

export default interface SolutionPayload{
  data: Solution[]
  total: number
  page: number
  totalPages: number
}
