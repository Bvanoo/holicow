export interface ApiComment {
  id_comment: number;
  content: string;
  status: boolean;
  date: string;
}

export interface ApiSolve {
  id_solve: number;
  status_solve: boolean;
  solutions: any[];
  commentaire: ApiComment[];
}

export interface SolutionResponse {
  id_solution: number;
  content: string;
  status_solution: boolean;
  solves: ApiSolve[];
}
