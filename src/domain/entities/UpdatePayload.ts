
export default interface UpdatePayload extends Record<string, unknown> {
  profilId: string | number
  content: string
  solutionId: number
  id_comment : string
}
