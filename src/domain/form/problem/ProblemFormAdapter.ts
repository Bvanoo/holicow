// ProblemForm.adapter.ts
import { ProblemService } from '@/domain/services/ProblemService'
import { createFormAdapter } from '../../../utils/formFactories/CreateFormAdapter'
import { problemFormInitial, type ProblemFormModel } from './ProblemFormModel'
import { problemFormRules } from './ProblemFormRules'
import type Problem from '@/domain/entities/Problem'
import type CreateProblem from '@/domain/entities/createProblem'
import { ProblemRepositoryHttp } from '@/dal/repositories/ProblemRepositoryHttp'
import { AxiosHttpClient } from '@/dal/http/AxiosHttpClient'

// ✅ Simulations API
async function apiCreateProblem(data: ProblemFormModel): Promise<Problem> {
  //‼️Pas de service avec l'inject, passer l'inject dans la fonction apiCreateProblem‼️

  // const problemService = inject<ProblemService>('problemService')
  const http = new AxiosHttpClient()

  const propRepository = new ProblemRepositoryHttp(http)
  const problemService = new ProblemService(propRepository)

  const newProblem: CreateProblem = {
    disease_name_FR: data.disease_name_FR,
    disease_name_DE: '',
    disease_name_EN: '',
    disease_name_NL: '',
    est_healing_time: Number(data.est_healing_time),
    status_disease: false,
  }
  const response = problemService?.createProblem('admin', newProblem) as Promise<Problem>
  console.log('CREATE Problem:', await response)
  return response
}

async function apiUpdateProblem(data: ProblemFormModel): Promise<ProblemFormModel> {
  console.log('UPDATE API:', data)
  return { ...data }
}

async function apiDeleteProblem(data: ProblemFormModel): Promise<void> {
  console.log('DELETE API:', data)
}

export function createProblemFormAdapter() {
  return createFormAdapter<ProblemFormModel>({
    initial: problemFormInitial,
    rules: problemFormRules,
    onCreate: apiCreateProblem,
    onUpdate: apiUpdateProblem,
    onDelete: apiDeleteProblem,
  })
}
