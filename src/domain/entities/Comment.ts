
export default interface Comment extends Record<string, unknown> {
  id_comment: number;
  content: string
  status : boolean;
  date: Date
}
