export default interface CreateComment extends Record<string, unknown> {
  content : string,
  id : string,
  solutionId: string,
}
