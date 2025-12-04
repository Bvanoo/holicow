/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ISolutionRepository } from '@/domain/repositories/ISolutionRepository'
import type SolutionPayload from '@/domain/entities/SolutionPayload'
import type Solution from '@/domain/entities/Solution'

export class SolutionRepositoryHttp implements ISolutionRepository {
  constructor(
    private http: {
      getSolutionsBySubProblemId: (url: string) => Promise<SolutionPayload>
      getAllSolution: (url: string) => Promise<SolutionPayload>
    },
  ) {}
  async getAllSolution(page: number, limit: number): Promise<SolutionPayload> {
    return await this.http.getAllSolution(
      `http://localhost:3000/solution?page=${page}&limit=${limit}`,
    )
  }

  async getSolutionsBySubProblemId(
    idSubProblem: string,
    page: number,
    limit: number,
    sortedBy: string,
    sortedOrder: string,
  ): Promise<SolutionPayload> {
    console.log('')
    return {
      data: [
        {
          id_solution: '1',
          status_solution: true,
          solution_description_FR:
            'Isoler immédiatement les animaux infectés et désinfecter toutes les surfaces. Contacter un vétérinaire pour un diagnostic précis.',
          solution_description_NL:
            'Isoleer geïnfecteerde dieren onmiddellijk en desinfecteer alle oppervlakken. Neem contact op met een dierenarts voor een nauwkeurige diagnose.',
          solution_description_EN:
            'Immediately isolate infected animals and disinfect all surfaces. Contact a veterinarian for accurate diagnosis.',
          solution_description_DE:
            'Infizierte Tiere sofort isolieren und alle Oberflächen desinfizieren. Kontaktieren Sie einen Tierarzt für eine genaue Diagnose.',
        },
        {
          id_solution: '2',
          status_solution: true,
          solution_description_FR:
            "Administrer des antibiotiques selon prescription vétérinaire. Améliorer les conditions d'hygiène de la ferme.",
          solution_description_NL:
            'Antibiotica toedienen volgens voorschrift van de dierenarts. Verbeter de hygiënische omstandigheden op de boerderij.',
          solution_description_EN:
            'Administer antibiotics as prescribed by veterinarian. Improve farm hygiene conditions.',
          solution_description_DE:
            'Antibiotika nach tierärztlicher Verschreibung verabreichen. Hygienebedingungen auf dem Bauernhof verbessern.',
        },
      ],
      total: 2,
      page: 1,
      totalPages: 1,
    } as SolutionPayload
    // return await this.http.getSolutionsBySubProblemId(`routeSolutionsList${idSubProblem}`)
  }
}
