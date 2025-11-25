import type Solution from "../entities/Solution";

export interface IProblemRepository {
  getAll() : Promise<Solution[]>
}
