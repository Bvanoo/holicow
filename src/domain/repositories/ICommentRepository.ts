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


  createComment(role : string, object: CreateComment): Promise<Comment>

  getCommentByDisease(
    diseaseId : string,
    page : number,
    limit : number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<CommentPayload>

  deleteComment(
    id_comment: string,
    role : string,
  ) : Promise<boolean>


  updateComment(
    id_comment: string,
    role : string,
    updatePayload : { content: string }
  ) : Promise<Comment>

  approveComment(
    id_comment: string,
    role : string,
  ) : Promise<boolean>
}
