/*import type CreateComment from '../entities/createComment';
import type { CommentsRepositoryHttp } from '@/dal/repositories/CommentsRepositoryHttp';
import type Comment from '../entities/Comment';
export class  CommentService {
  constructor(private repo : CommentsRepositoryHttp) {
  }
  async createComment(newComment : CreateComment){
    if (!newComment.content || newComment.content.length === 0) {
      throw new Error("Le commentaire ne peut pas être vide")
    }
    if(!newComment.id || !newComment.diseaseId){
      throw new Error ("Identifiant de l'utilisateur ou identifiant de maladie manquant")
    }
    return await this.repo.createComment(newComment)
  }
}*/
