import type Solution from '../entities/Solution'

export interface ISolutionRepository {
  getAll(): Promise<Solution[]>
}
