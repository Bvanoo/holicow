import type SubProblem from "./SubProblem"

export default interface Problem {
  id: string | number,
  name: string,
  commentsNumber: number,
  alertsNumber: number,
  alertsByAvatar: number
  subProblems?: Array<SubProblem>
}
