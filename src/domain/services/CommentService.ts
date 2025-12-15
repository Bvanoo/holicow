import type CreateComment from '../entities/createComment';
import type { CommentsRepositoryHttp } from '@/dal/repositories/CommentsRepositoryHttp';
import type Comment from '../entities/Comment';
import type {CommentPayload} from "@/domain/entities/CommentPayload.ts";
import type UpdatePayload from "@/domain/entities/UpdatePayload.ts";
export class  CommentService {
  constructor(private repo : CommentsRepositoryHttp) {
  }
  /*async createComment(solutionId : number, newComment : CreateComment){

    if (!newComment.content || newComment.content.length === 0) {
      throw new Error("Le commentaire ne peut pas être vide")
    }
    if(!newComment.id || !newComment.solutionId){
      throw new Error ("Identifiant de l'utilisateur ou solution manquante")
    }
    return await this.repo.createComment(solutionId, newComment);
  }*/

  // async deleteComment(role : string, id_commentaire: string): Promise<boolean>  {
  //   if(role !== "Admin"){
  //     throw new Error("Vous n'êtes pas autorisé à supprimer un commentaire")
  //   }
  //   if(!id_commentaire){
  //     throw new Error("Il n'y a aucun commentaire à supprimer")
  //   }
  //   return await this.repo.deleteComment(id_commentaire, role);
  // }

  // async updateComment(updatePayload : UpdatePayload): Promise<Comment>  {
  //
  //   if (!updatePayload.content || updatePayload.content.length === 0) {
  //     throw new Error("Le contenu du commentaire ne peut pas être vide");
  //   }
  //   if (!updatePayload.id_comment || !updatePayload.solutionId) {
  //     throw new Error("Identifiant du commentaire ou de la solution manquant");
  //   }
  //
  //   return await this.repo.updateComment(updatePayload);
  // }

  // async getAllCommentById(
  //   role : string,
  //   id : string,
  //   page : number,
  //   limit : number,
  //   sortedBy: string,
  //   sortedOrder: string
  // ): Promise<CommentPayload> {
  //   if(!role){
  //     throw new Error("Vous n'avez entrez aucun rôle")
  //   }
  //   if(!id) {
  //     throw new Error("Utilisateur inexistant")
  //   }
  //   return await this.repo.getAllComment(
  //     role,
  //     id,
  //     Math.max(page, 1),
  //     Math.max(limit, 4),
  //     sortedBy || '',
  //     sortedOrder || '')
  // }
  async getCommentBySolutionId(solutionId: number, sortedOrder: string, lang : string) : Promise<CommentPayload> {
    if(!solutionId){
      throw new Error ("Solution inexistante")
    }
    else{
      return await this.repo.getCommentBySolutionId(
        solutionId,
        sortedOrder,
        lang
      )
    }
  }
  // async approveComment(commentId : number, role : string) : Promise<boolean>  {
  //   if(!commentId || !role){
  //     throw new Error("Impossible de récupérer les commentaires ou role non défini")
  //   }
  //   else {
  //     return await this.repo.approveComment(commentId, role)
  //   }
  // }
}
