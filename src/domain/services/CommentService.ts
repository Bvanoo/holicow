import type CreateComment from '../entities/createComment';
import type { CommentsRepositoryHttp } from '@/dal/repositories/CommentsRepositoryHttp';
import type Comment from '../entities/Comment';
import type {CommentPayload} from "@/domain/entities/CommentPayload.ts";
export class  CommentService {
  constructor(private repo : CommentsRepositoryHttp) {
  }
  async createComment(role : string, newComment : CreateComment){

    if (!newComment.content || newComment.content.length === 0) {
      throw new Error("Le commentaire ne peut pas être vide")
    }
    if(!newComment.id || !newComment.diseaseId){
      throw new Error ("Identifiant de l'utilisateur ou identifiant de maladie manquant")
    }
    return await this.repo.createComment(role, newComment);
  }

  async getAllCommentById(id: number){

  }
}
