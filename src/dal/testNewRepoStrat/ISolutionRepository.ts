/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IRepositoryStrategy, StrategyResponse } from './IRepositoryStrategy'
import type { Solution, SolutionDTO, SolutionId } from './Solution'

export interface ISolutionRepository {
  createSolution(
    profilId: string,
    role: string,
    solutionContent: string,
    solutionStatus: boolean,
    problemId: number,
    subProblemId: number
  ): Promise<StrategyResponse<Solution>>

  // Appartient à la section métier pour les comportements spécifiques
  createSolutionFromSimpleUser(id: SolutionId, solutionContent: string): Promise<Solution>

  // Appartient au repository comme méthodes de base
  setResourcePath(path : string): void
  setStrategy(transport: IRepositoryStrategy): void
}

export default class SolutionRepository implements ISolutionRepository {
  private transport: IRepositoryStrategy
  // chemin REST ou identifiant logique du endpoint
  private resourcePath = '/solution'

  constructor(transport: IRepositoryStrategy) {
    this.transport = transport
  }
  createSolution(
    profilId: string,
    role: string,
    solutionContent: string,
    solutionStatus: boolean,
    problemId: number,
    subProblemId: number
  ): Promise<StrategyResponse<Solution>> {
    // ?lang=fr&profilId=admin
    const path = `${this.resourcePath}/create/${role}?lang=fr&profilId=${profilId}`
    const solutionDTO: SolutionDTO = {
      status_solution: solutionStatus,
      solution_description_FR: solutionContent,
      solution_description_NL: solutionContent,
      solution_description_DE: solutionContent,
      solution_description_EN: solutionContent,
      id_disease: problemId,
      id_subDisease: subProblemId,
      associations: [
      {
        id_disease: problemId,
        id_subDisease : subProblemId
      }
  ],
    }
    return this.transport.request(path, {method: "POST", body: solutionDTO} )
  }

  createSolutionFromSimpleUser(id: SolutionId, solutionContent: string): Promise<Solution> {
    const path = `${this.resourcePath}/${id}`
    throw new Error('Method not implemented.')
  }

  setStrategy(transport: IRepositoryStrategy) {
    this.transport = transport
  }

  setResourcePath(path:string) {
    this.resourcePath = path;
  }

  // async findById(id: solutionId): Promise<SolutionDTO | null> {
  //   const path = `${this.resourcePath}/${id}`;
  //   const res = await this.transport.request<UserDTO>(path, { method: 'GET' });
  //   if (!res.success) {
  //     // log/transform error as desired
  //     if (res.error.includes('Not found')) return null;
  //     throw new Error(`Repository error: ${res.error}`);
  //   }
  //   return res.data;
  // }

  // async save(user: UserDTO): Promise<UserDTO> {
  //   const path = `${this.resourcePath}/${user.id}`;
  //   const res = await this.transport.request<UserDTO>(path, { method: 'PUT', body: user });
  //   if (!res.success) throw new Error(`Repository error: ${res.error}`);
  //   return res.data;
  // }

  // subscribeToUser(id: UserId, cb: (u: UserDTO) => void) {
  //   if (!this.transport.subscribe) return undefined;
  //   // path convention pour WS
  //   return this.transport.subscribe<UserDTO>(`${this.resourcePath}/${id}`, cb);
  // }
}
