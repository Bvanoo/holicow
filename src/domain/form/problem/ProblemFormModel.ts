export interface ProblemFormModel extends Record<string, unknown> {
  name: string
  description: string
}

export const problemFormInitial: ProblemFormModel = {
  name: '',
  description: '',
}
