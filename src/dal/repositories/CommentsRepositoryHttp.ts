import type ICommentRepository from "@/domain/repositories/ICommentRepository.ts";
import type {CommentPayload} from "@/domain/entities/CommentPayload.ts";
import type CreateComment from "@/domain/entities/createComment.ts";
import type Comment from "@/domain/entities/Comment";
import type {AxiosHttpClient} from "@/dal/http/AxiosHttpClient.ts";
import {UpdateVerb} from "@/dal/http/AxiosHttpClient.ts";
import type UpdatePayload from "@/domain/entities/UpdatePayload.ts";

export class CommentsRepositoryHttp implements ICommentRepository{
  constructor(
    private http:
        AxiosHttpClient
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


  async createComment(solutionId : number, object: CreateComment): Promise<Comment> {
    const url = `http://localhost:3000/comments/${solutionId}`;
    return await this.http.create(url, object);
  }


  async getCommentBySolutionId(solutionId: number, page: number, limit: number, sortedBy: string, sortedOrder: string): Promise<CommentPayload> {
    const url = `http://localhost:3000/comments/solution/${solutionId}?page=${page}&limit=${limit}&sortedBy=${sortedBy}&sortedOrder=${sortedOrder}`;
    return await this.http.get(url)
  }


  async deleteComment(id_comment : string, role : string): Promise<boolean> {
    const url = `http://localhost:3000/comments/${id_comment}?role=${role}`;
    const response = await this.http.delete(url);

    return response.status === 200 || response.status === 204;
  }

  async updateComment(updatePayload : UpdatePayload): Promise<Comment> {
    const solutionIdValue = updatePayload.solutionId
    const url = `http://localhost:3000/comments/${solutionIdValue}`;
    return await this.http.update(url, updatePayload, UpdateVerb.put);
  }

  async approveComment(commentId : number, role : string): Promise<boolean> {
    const url = `http://localhost:3000/solution/approve_comment/${commentId}`;
    const response = await this.http.approve(url, {});
    return response.status === 200 || response.status === 204;
  }
}
