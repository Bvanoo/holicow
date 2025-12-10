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

  async deleteComment(role : string, id_commentaire: string): Promise<boolean>  {
    if(role !== "Admin"){
      throw new Error("Vous n'êtes pas autorisé à supprimer un commentaire")
    }
    if(!id_commentaire){
      throw new Error("Il n'y a aucun commentaire à supprimer")
    }
    return await this.repo.deleteComment(id_commentaire, role);
  }

  async updateComment(role : string, id_commentaire: string, updateComment : Comment): Promise<Comment>  {

    if(role !== "Farmer") {
      throw new Error("Impossible de modifier le commentaire")
    }
    return await this.repo.updateComment(role, id_commentaire, updateComment);
  }

  async getAllCommentById(
    role : string,
    id : string,
    page : number,
    limit : number,
    sortedBy: string,
    sortedOrder: string
  ): Promise<CommentPayload> {
    if(!role){
      throw new Error("Vous n'avez entrez aucun rôle")
    }
    if(!id) {
      throw new Error("Utilisateur inexistant")
    }
    return await this.repo.getAllComment(
      role,
      id,
      Math.max(page, 1),
      Math.max(limit, 4),
      sortedBy || '',
      sortedOrder || '')
  }
  async getCommentByDisease(diseaseId: string, page: number, limit: number, sortedBy: string, sortedOrder: string) : Promise<CommentPayload> {
    if(!diseaseId){
      throw new Error ("Maladie inexistante")
    }
    else{
      return await this.repo.getCommentByDisease(
        diseaseId,
        Math.max(page, 1),
        Math.max(limit, 4),
        sortedBy,
        sortedOrder,
      )
    }
  }
}
