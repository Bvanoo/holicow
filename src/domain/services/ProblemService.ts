import { showSimpleErrorBox } from '../exception/utils'
import type { IProblemRepository } from '../repositories/ISubProblemRepository'

export class ProblemService {
  constructor(private repo: IProblemRepository) {}

  async getAllProblems(page: number, limit: number, sortedBy: string, sortedOrder: string) {
    return await this.repo
      .getAll(Math.max(page, 1), Math.max(limit, 1), sortedBy || '', sortedOrder || '')
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
