import type {CommentPayload} from "@/domain/entities/CommentPayload.ts";
import type CreateComment from "@/domain/entities/createComment.ts";
import type Comment from "@/domain/entities/Comment.ts";
import type ProblemPayload from "@/domain/entities/ProblemPayload.ts";
import type UpdatePayload from "@/domain/entities/UpdatePayload.ts";

export default interface ICommentRepository {
  getCommentBySolutionId(
    solutionId : number,
    sortedOrder: string,
    lang: string
  ): Promise<CommentPayload>

  // getCommentByUserId(
  //   id: string,
  //   page: number,
  //   limit: number,
  //   sortedBy: string,
  //   sortedOrder: string,
  // ): Promise<CommentPayload>
  //
  // getAllComment(
  //   role : string,
  //   id: string,
  //   page: number,
  //   limit: number,
  //   sortedBy: string,
  //   sortedOrder: string,
  // ): Promise<CommentPayload>
  //
  //
  // createComment(solutionId : number, object: CreateComment): Promise<Comment>
  //
  // getCommentBySolutionId(
  //   solutionId : number,
  //   sortedOrder: string,
  //   lang: string
  // ): Promise<CommentPayload>
  //
  // deleteComment(
  //   id_comment: string,
  //   role : string,
  // ) : Promise<boolean>
  //
  //
  // updateComment(
  //   updatePayload : UpdatePayload
  // ) : Promise<Comment>
  //
  // approveComment(
  //   commentId: number,
  //   role : string,
  // ) : Promise<boolean>
}
