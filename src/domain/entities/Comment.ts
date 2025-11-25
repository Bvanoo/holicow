import type Avatar from "./Avatar";

export default interface Comment {
  id: string | number,
  content: string,
  avatar: Avatar,
  date: Date,
  commentsFromVet: Array<Comment>,
  commentsFromUsers: Array<Comment>
}
