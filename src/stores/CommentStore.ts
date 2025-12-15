// import {defineStore} from "pinia";
// import {CommentService} from "@/domain/services/CommentService.ts";
// import {CommentsRepositoryHttp} from "@/dal/repositories/CommentsRepositoryHttp.ts";
// import type Comment from "@/domain/entities/Comment.ts";
// import type { CommentPayload } from '@/domain/entities/CommentPayload';
// import type CreateComment from "@/domain/entities/createComment.ts";
// import {AxiosHttpClient} from "@/dal/http/AxiosHttpClient.ts";
// import type UpdateCommentPayload from '@/domain/entities/UpdatePayload.ts';
// const httpClient = new AxiosHttpClient();
// const commentService = new CommentService(new CommentsRepositoryHttp(httpClient));
//
// interface PaginationState {
//   total : number;
//   page : number;
//   limit : number;
//   totalPages : number;
// }
//
// interface CommentState {
//   comments : Comment[];
//   pagination : PaginationState | null;
//   isLoading : boolean;
//   error : string | null;
// }
//
// export const CommentStore = defineStore('comments', {
//   state: () : CommentState => ({
//     comments: [],
//     pagination : null,
//     isLoading : false,
//     error : null,
//   }),
//
//   getters : {
//     approvedComments(state): Comment[] {
//       return state.comments.filter(c => (c as any).isApproved === true);
//     },
//
//     pendingComments(state): Comment[] {
//       return state.comments.filter(c => (c as any).isApproved === false);
//     },
//     hasNextPage(state) : boolean {
//       if(!state.pagination) {
//         return false;
//       }
//       return state.pagination.page < state.pagination.totalPages;
//     },
//     currentPage(state) : number {
//       return state.pagination?.page || 1
//     }
//   },
//   actions: {
//     async fetchCommentsBySolutionId(
//       this: CommentState & any,
//       solutionId: number,
//       params: { page: number, limit: number, sortedBy: string, sortedOrder: string, lang: string },
//     ) {
//       this.isLoading = true;
//       this.error = null;
//
//       try {
//         console.log('Fetching comments for solution:', solutionId, 'with params:', params);
//
//         const payload: CommentPayload = await commentService.getCommentBySolutionId(
//           solutionId,
//           params.page,
//           params.limit,
//           params.sortedBy,
//           params.sortedOrder,
//           params.lang
//         );
//
//         console.log('Received payload:', payload);
//
//         console.log('Comments loaded:', this.comments.length);
//
//       } catch (e) {
//         console.error('Error fetching comments:', e);
//         this.error = (e instanceof Error)
//           ? e.message
//           : "Erreur inconnue lors du chargement des commentaires de solution.";
//       } finally {
//         this.isLoading = false;
//       }
//     },
//     async updateCommentAction(UpdatePayload : UpdateCommentPayload){
//       this.isLoading = true;
//       this.error = null;
//
//       try{
//         const updateComment = await commentService.updateComment(UpdatePayload);
//         const index = this.comments.findIndex((c) => c.id === UpdatePayload.id_comment);
//         if(index !== -1){
//           this.comments[index] = updateComment
//         }
//         return updateComment
//       }catch(e){
//         this.error = (e instanceof Error) ? e.message : "Erreur lors de la modification du commentaire";
//         throw e;
//       } finally {
//         this.isLoading = false;
//       }
//     }
//   }
// })
