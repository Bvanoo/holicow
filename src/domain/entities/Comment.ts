import type Avatar from './Avatar'

export default interface Comment extends Record<string, unknown> {
  profilId: string | number
  content: string
  avatar: Avatar
  date: Date
  isApproved: boolean
  solutionId: number
  // commentsFromVet: Array<Comment>,
  // commentsFromUsers: Array<Comment>
}
