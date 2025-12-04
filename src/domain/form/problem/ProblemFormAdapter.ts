// ProblemForm.adapter.ts
import { createFormAdapter } from '../../../utils/formFactories/CreateFormAdapter'
import { problemFormInitial, type ProblemFormModel } from './ProblemFormModel'
import { problemFormRules } from './ProblemFormRules'

// ✅ Simulations API
async function apiCreateProblem(data: ProblemFormModel): Promise<ProblemFormModel> {
  console.log('CREATE API:', data)
  return { ...data } // simule un retour backend
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
