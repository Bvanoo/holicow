// ProblemForm.adapter.ts
import { createFormAdapter } from '../../../utils/formFactories/CreateFormAdapter'
import { problemFormRules } from './SubProblemFormRules'
import { subProblemFormInitial, type SubProblemFormModel } from './SubProblemFormModel'
import { AxiosHttpClient } from '@/dal/http/AxiosHttpClient'
import { SubProblemRepositoryHttp } from '@/dal/repositories/SubProblemRepositoryHttp'
import { SubProblemService } from '@/domain/services/SubProblemService'
import type CreateSubProblem from '@/domain/entities/createSubProblem'

// ✅ Simulations API
async function apiCreateSubProblem(data: SubProblemFormModel): Promise<SubProblemFormModel> {
  //‼️Pas de service avec l'inject, passer l'inject dans la fonction apiCreateProblem‼️
  // const problemService = inject<ProblemService>('problemService')
  //   const dependenciesStore = useDependenciesStore()
  // const problemService = dependenciesStore.dependenciesManager.inject<ProblemService>
  const http = new AxiosHttpClient()
  const subPropRepository = new SubProblemRepositoryHttp(http)
  const subProblemService = new SubProblemService(subPropRepository)
  console.log('data', data)

  const newSubProblem: CreateSubProblem = {
    sub_disease_name_FR: data.sub_disease_name_FR,
    sub_disease_name_DE: '',
    sub_disease_name_EN: '',
    sub_disease_name_NL: '',
    status_sub_disease: false,
    diseaseId: data.id_disease as string,
  }
  return subProblemService
    ?.createSubProblem('admin', newSubProblem)
    .then(async (result) => {
      console.log('------------', result)
      if (result) {
        const formProblem: SubProblemFormModel = {
          id_disease: result.diseaseId,
          id_sub_disease: result.id_sub_disease,
          sub_disease_name_FR: result.sub_disease_name_FR,
          status_sub_disease: result.status_sub_disease ? 'true' : 'false',
        }
        console.log('CREATE Problem:', formProblem)
        return formProblem
      }
    })
    .catch((e) => e)
}

async function apiUpdateSubProblem(data: SubProblemFormModel): Promise<SubProblemFormModel> {
  console.log('UPDATE API PROBLEM:', data)
  return { ...data }
}

async function apiDeleteSubProblem(data: SubProblemFormModel): Promise<void> {
  console.log('DELETE API:', data)
}
export function createSubProblemFormAdapter() {
  return createFormAdapter<SubProblemFormModel>({
    initial: subProblemFormInitial,
    rules: problemFormRules,
    onCreate: apiCreateSubProblem,
    onUpdate: apiUpdateSubProblem,
    onDelete: apiDeleteSubProblem,
  })
}
