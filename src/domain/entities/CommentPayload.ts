import type Comment from "./Comment"
import type Solve from "@/domain/entities/Solve.ts";

export interface CommentPayload {
  id_solution : number;
  content : string;
  status_solution : boolean;
  solves: Solve[];
  comments: Comment[];
}


