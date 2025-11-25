import { showSimpleErrorBox } from "../exception/utils";
import type { IProblemRepository } from "../repositories/IProblemRepository";

export class ProblemService {

  constructor(private repo: IProblemRepository) {}

  async getAllProblems() {
    const problems = await this.repo.getAll()
    .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

}
