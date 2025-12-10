import type Avatar from './Avatar'

export default interface Comment extends Record<string, unknown> {
  id: string | number
  content: string
  avatar: Avatar
  date: Date
  isApproved: boolean
  solutionId: string
  // commentsFromVet: Array<Comment>,
  // commentsFromUsers: Array<Comment>
}
