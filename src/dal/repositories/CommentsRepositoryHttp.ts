import type ICommentRepository from "@/domain/repositories/ICommentRepository.ts";
import type {CommentPayload} from "@/domain/entities/CommentPayload.ts";
import type CreateComment from "@/domain/entities/createComment.ts";


export class CommentsRepositoryHttp implements ICommentRepository{
  constructor(
    private http: {
      get: (url: string) => Promise<CommentPayload>
      create: (url: string, object: Record<string, unknown>) => Promise<Comment>
    },
  ) {}
  async getCommentByUserId(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<CommentPayload> {
    //terminer de faire la requête HTTP
    return await this.http.get("http://localhost:3000")
  }

  async getAllComment(
    role: string,
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<CommentPayload>{
    //terminer de faire la requête HTTP
    return await this.http.get("http://localhost:3000")
  }

  async createComment(role : string, object: CreateComment): Promise<CommentPayload> {
    //terminer de faire la requête HTTP
    return await this.http.get("http://localhost:3000")
  }

  async getCommentByDisease(diseaseId: string, page: number, limit: number, sortedBy: string, sortedOrder: string): Promise<CommentPayload> {

    //terminer de faire la requête HTTP
    return await this.http.get("http://localhost:3000")
  }
}
