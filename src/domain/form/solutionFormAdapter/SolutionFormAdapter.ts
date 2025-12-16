// ProblemForm.adapter.ts
import { createFormAdapter } from '../../../utils/formFactories/CreateFormAdapter'
import { AxiosHttpClient } from '@/dal/http/AxiosHttpClient'
import { SolutionRepositoryHttp } from '@/dal/repositories/SolutionRepositoryHttp'
import { SolutionService } from '@/domain/services/SolutionService'
import { SolutionFormInitial, type SolutionFormModel } from './SolutionFormModel'
import type CreateSolution from '@/domain/entities/CreateSolution'
import { useUserStore } from '@/stores/User'
import { solutionFormRules } from './SolutionFormRules'

// ✅ Simulations API
async function apiCreateSubProblem(data: SolutionFormModel): Promise<SolutionFormModel> {
  //‼️Pas de service avec l'inject, passer l'inject dans la fonction apiCreateProblem‼️
  // const problemService = inject<ProblemService>('problemService')
  //   const dependenciesStore = useDependenciesStore()
  // const problemService = dependenciesStore.dependenciesManager.inject<ProblemService>
  const http = new AxiosHttpClient()
  const solutionRepositoryHttp = new SolutionRepositoryHttp(http)
  const solutionService = new SolutionService(solutionRepositoryHttp)
  const userStore = useUserStore()
  console.log('data', data)
  let newSolution: CreateSolution
  if (userStore.isProblemViewAction) {
    newSolution = {
      solution_description_FR: data.solution_description_FR as string,
      //bug de l'api, obligé de " ?? '' ", sinon on ne renvoit rien dans l'objet vers l'api, (si c'est null)
      solution_description_DE: (data.solution_description_DE as string) ?? '',
      solution_description_EN: (data.solution_description_EN as string) ?? '',
      solution_description_NL: (data.solution_description_NL as string) ?? '',
      status_solution: data.status_solution === 'true',
      id_disease: Number(data.id_disease),
    }
  } else {
    newSolution = {
      solution_description_FR: data.solution_description_FR as string,
      //bug de l'api, obligé de " ?? '' ", sinon on ne renvoit rien dans l'objet vers l'api, (si c'est null)
      solution_description_DE: (data.solution_description_DE as string) ?? '',
      solution_description_EN: (data.solution_description_EN as string) ?? '',
      solution_description_NL: (data.solution_description_NL as string) ?? '',
      status_solution: data.status_solution === 'true',
      id_disease: Number(data.id_disease),
      id_subDisease: Number(data.id_sub_disease),
    }
  }
  console.log('newSolution', newSolution)
  return await solutionService
    ?.createSolution('admin', 'fr', userStore.currentProfile?.profilId as string, newSolution)
    .then(async (result) => {
      console.log('Resultat API : ', result)
      if (result) {
        const formSolution: SolutionFormModel = {
          solution_description_FR: result.solutions.solution_description_FR as string,
          solution_description_DE: result.solutions.solution_description_DE as string,
          solution_description_EN: result.solutions.solution_description_EN as string,
          solution_description_NL: result.solutions.solution_description_NL as string,
          status_solution: result.solutions.status_solution ? 'true' : 'false',
          id_disease: result.diseases.id_disease as string,
          id_sub_disease: result.subDiseases?.id_sub_disease as string,
        }
        console.log('CREATE Problem:', formSolution)
        return formSolution
      }
    })
    .catch((e) => e)
}

async function apiUpdateSolution(data: SolutionFormModel): Promise<SolutionFormModel> {
  console.log('UPDATE API PROBLEM:', data)
  return { ...data }
}

async function apiDeleteSolution(data: SolutionFormModel): Promise<void> {
  console.log('DELETE API:', data)
}
export function createSolutionFormAdapter() {
  return createFormAdapter<SolutionFormModel>({
    initial: SolutionFormInitial,
    rules: solutionFormRules,
    onCreate: apiCreateSubProblem,
    onUpdate: apiUpdateSolution,
    onDelete: apiDeleteSolution,
  })
}
