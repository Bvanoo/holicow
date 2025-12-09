// ProblemForm.adapter.ts
import { createFormAdapter } from '../../../utils/formFactories/CreateFormAdapter'
import { problemFormRules } from './SubProblemFormRules'
import { subProblemFormInitial, type SubProblemFormModel } from './SubProblemFormModel'

// ✅ Simulations API
async function apiCreateSubProblem(data: SubProblemFormModel): Promise<SubProblemFormModel> {
  //‼️Pas de service avec l'inject, passer l'inject dans la fonction apiCreateProblem‼️
  // const problemService = inject<ProblemService>('problemService')
  //   const dependenciesStore = useDependenciesStore()
  // const problemService = dependenciesStore.dependenciesManager.inject<ProblemService>
  // const http = new AxiosHttpClient()
  // const propRepository = new ProblemRepositoryHttp(http)
  // const problemService = new ProblemService(propRepository)
  // const newProblem: CreateProblem = {
  //   disease_name_FR: data.disease_name_FR,
  //   disease_name_DE: '',
  //   disease_name_EN: '',
  //   disease_name_NL: '',
  //   est_healing_time: Number(data.),
  //   status_disease: false,
  // }
  // return problemService
  //   ?.createProblem('admin', newProblem)
  //   .then(async (result) => {
  //     if (result) {
  //       const formProblem: SubProblemFormModel = {
  //         disease_name_FR: result.disease_name_FR as string,
  //         est_healing_time: result.est_healing_time as number,
  //         status_disease: result.status_disease as string,
  //       }
  //       console.log('CREATE Problem:', formProblem)
  //       return formProblem
  //     }
  //   })
  //   .catch((e) => e)
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
