import type Problem from "./Problem";

export default interface SubProblem extends Problem {
  subProblemId: number | string
}
