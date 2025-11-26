export default interface Solution {
  solutionId: number | string,
  problemId: number | string,
  subProblemId: number | string,
  description: string,
  globalRating: number,
  profilRating: number,
  commentCurrentUser: Comment
}
