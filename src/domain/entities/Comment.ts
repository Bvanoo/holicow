

export default interface Comment extends Record<string, unknown> {
  id_comment: string | number
  content: string
  status: boolean
  date: Date
  // commentsFromVet: Array<Comment>,
  // commentsFromUsers: Array<Comment>
}
