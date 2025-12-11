export default interface CreateComment extends Record<string, unknown> {
  content : string,
  profilId : string,
  solutionId: string,
}
