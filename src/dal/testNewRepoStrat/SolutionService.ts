import type { ISolutionRepository } from "./ISolutionRepository"
// import type { SolutionDTO } from './Solution'

export class SolutionService {
  private repo: ISolutionRepository

  constructor(repo: ISolutionRepository) {
    this.repo = repo
  }

  async getAllSolutions() {

  }

  async createAdminSolution(profilId:string, role :string, content: string, status: boolean, probId: number, subProbId: number) {
      let savedSolution = null;
    if(role === 'farmer')
      savedSolution = await this.repo.createSolution(profilId, 'farmer', content, false, probId, subProbId)
    else if(role === 'admin')
      savedSolution = await this.repo.createSolution(profilId, 'admin', content, true, probId, subProbId)

    if (!savedSolution) throw new Error('solution not created')
    // transforme / masque champs sensibles
    // const solutionDetail: Partial<SolutionDTO> = { content: content, status: status }
    return savedSolution
  }

    async updateSolution(profilId:string, role :string, content: string, status: boolean, probId: number, subProbId: number) {
      let savedSolution = null;
    if(role === 'farmer')
      savedSolution = await this.repo.createSolution(profilId, 'farmer', content, false, probId, subProbId)
    else if(role === 'admin')
      savedSolution = await this.repo.createSolution(profilId, 'admin', content, true, probId, subProbId)

    if (!savedSolution) throw new Error('solution not created')
    // transforme / masque champs sensibles
    // const solutionDetail: Partial<SolutionDTO> = { content: content, status: status }
    return savedSolution
  }

  // Exemple de règle métier : on ne peut pas désactiver le dernier admin
  // async deactivateUser(userId: UserId) {
  //   const user = await this.repo.findById(userId);
  //   if (!user) throw new Error('User not found');

  //   // règle métier fictive : email required to update not-empty
  //   if (!user.email) throw new Error('User has no email, cannot deactivate');

  //   // Par exemple : check autre chose via repo
  //   // (ici on suppose la règle passe)
  //   const updated: UserDTO = { ...user, active: false };
  //   return this.repo.save(updated);
  // }

  // async getUserProfile(userId: UserId) {
  //   const user = await this.repo.findById(userId);
  //   if (!user) throw new Error('User not found');
  //   // transforme / masque champs sensibles
  //   const profile: Partial<UserDTO> = { id: user.id, name: user.name, active: user.active };
  //   return profile as UserDTO;
  // }
}
