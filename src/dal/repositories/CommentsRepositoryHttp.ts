import type ICommentRepository from "@/domain/repositories/ICommentRepository.ts";
import type {CommentPayload} from "@/domain/entities/CommentPayload.ts";
import type CreateComment from "@/domain/entities/createComment.ts";
import type Comment from "@/domain/entities/Comment";


export class CommentsRepositoryHttp implements ICommentRepository{
  constructor(
    private http: {
      get: (url: string) => Promise<CommentPayload>
      create: (url: string, object: Record<string, unknown>) => Promise<Comment>
      update: (url: string, object: Record<string, unknown>) => Promise<Comment>
      delete: (url: string) => Promise<{ status : number }>
      approve: (url: string, object: Record<string, unknown>) => Promise<Comment>
    },
  ) {}


  async getCommentByUserId(
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<CommentPayload> {
    const url = `http://localhost:3000/comments/user/${id}?page=${page}&limit=${limit}&sortedBy=${sortedBy}&sortedOrder=${sortedOrder}`;
    return await this.http.get(url)
  }


  async getAllComment(
    role: string,
    id: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<CommentPayload>{
    const url = `http://localhost:3000/comments/all?role=${role}&id=${id}&page=${page}&limit=${limit}&sortedBy=${sortedBy}&sortedOrder=${sortedOrder}`;
    return await this.http.get(url)
  }


  async createComment(role : string, object: CreateComment): Promise<Comment> {
    const url = `http://localhost:3000/comments/create?role=${role}`;
    return await this.http.create(url, object);
  }


  async getCommentByDisease(diseaseId: string, page: number, limit: number, sortedBy: string, sortedOrder: string): Promise<CommentPayload> {
    const url = `http://localhost:3000/comments/disease/${diseaseId}?page=${page}&limit=${limit}&sortedBy=${sortedBy}&sortedOrder=${sortedOrder}`;
    return await this.http.get(url)
  }


  async deleteComment(id_comment : string, role : string): Promise<boolean> {
    const url = `http://localhost:3000/comments/${id_comment}?role=${role}`;
    const response = await this.http.delete(url);

    return response.status === 200 || response.status === 204;
  }

  async updateComment(id_comment: string, role: string, updatePayload : { content: string }): Promise<Comment> {
    const url = `http://localhost:3000/comments/${id_comment}?role=${role}`;
    return await this.http.update(url, updatePayload);
  }

  async approveComment(id_comment : string, role : string): Promise<boolean> {
    const url = `http://localhost:3000/comments/${id_comment}/approve?role=${role}`;
    const response = await this.http.approve(url, {});
    return response.status === 200 || response.status === 204;
  }
}
