// src/api/infrastructure/repositories/UserRepositoryHttp.ts
import type Problem from "@/domain/entities/Problem";
import type { IProblemRepository } from "../../domain/repositories/IProblemRepository";


export class ProblemRepositoryHttp implements IProblemRepository {
  constructor(
    private http: { get: (url: string) => Promise<any> }
  ) {}

  async getAll(): Promise<Problem[]> {
    return await this.http.get("/api/....?");
  }
}
