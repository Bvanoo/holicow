import type { SolutionRepositoryHttp } from '@/dal/repositories/SolutionRepositoryHttp'
import type CreateSolution from '../entities/CreateSolution'

export class SolutionService {
  constructor(private repo: SolutionRepositoryHttp) {}

  async getAllSolution(page: number, limit: number) {
    return await this.repo.getAllSolution(page, limit)
  }

  async getSolutionsBySubProblemId(
    idProblem: string,
    lang: string,
    role: string,
    profilId: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ) {
    return await this.repo
      .getSolutionsBySubProblemId(
        idProblem,
        lang,
        role,
        profilId,
        page,
        limit,
        sortedBy,
        sortedOrder,
      )
      .catch((err) => console.error(err.message))
  }
  async getSolutionsByProblemId(
    idProblem: string,
    lang: string,
    role: string,
    profilId: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ) {
    return await this.repo
      .getSolutionsByProblemId(idProblem, lang, role, profilId, page, limit, sortedBy, sortedOrder)
      .catch((err) => console.error(err.message))
  }
  async getSolutionById(idSolution: string, lang: string) {
    return await this.repo
      .getSolutionById(idSolution, lang)
      .catch((err) => console.error(err.message))
  }
  async createSolution(role: string, lang: string, profilId: string, newSolution: CreateSolution) {
    return await this.repo
      .createSolution(role, lang, profilId, newSolution)
      .catch((err) => console.warn(err.message))
  }
}
