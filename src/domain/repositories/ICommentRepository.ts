import type {CommentPayload} from "@/domain/entities/CommentPayload.ts";
import type CreateComment from "@/domain/entities/createComment.ts";
import type Comment from "@/domain/entities/Comment.ts";
import type ProblemPayload from "@/domain/entities/ProblemPayload.ts";

export default interface ICommentRepository {
  getCommentByUserId(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<CommentPayload>

  getAllComment(
    role : string,
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<CommentPayload>

  createComment(role : string, object: CreateComment): Promise<CommentPayload>

  getCommentByDisease(
    diseaseId : string,
    page : number,
    limit : number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<CommentPayload>
}
