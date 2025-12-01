import type Solution from './Solution'

export default interface SolutionsList {
  solutionId: number | string
  solutions: Array<Solution>
  globalRating: number
  comments: number
  alerts: number
  currentUserAlerts: number
}
