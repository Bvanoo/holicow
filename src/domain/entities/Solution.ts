export default interface Solution extends Record<string, unknown> {
  id_solution: string
  status_solution: boolean
  solution_description_FR: string
  solution_description_NL: string
  solution_description_EN: string
  solution_description_DE: string
  // id_solution: number | string
  // problemId: number | string
  // subProblemId: number | string
  // solution_description_FR: string
  // globalRating: number
  // profilRating: number
  // commentCurrentUser: Comment
  // status_solution: boolean
  // id_subDisease: number
}
