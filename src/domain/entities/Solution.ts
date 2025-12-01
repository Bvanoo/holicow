export default interface Solution {
  id_solution: number | string
  problemId: number | string
  subProblemId: number | string
  solution_description_FR: string
  globalRating: number
  profilRating: number
  commentCurrentUser: Comment
  status_solution: boolean
  id_subDisease: number
}
