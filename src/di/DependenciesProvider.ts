import { ProblemService } from '../domain/services/ProblemService'
import { ProblemRepositoryHttp } from '../dal/repositories/ProblemRepositoryHttp'
import { AxiosHttpClient } from '../dal/http/AxiosHttpClient'
import type { App } from 'vue'
import { AlertsRepositoryHttp } from '@/dal/repositories/AlertsRepositoryHttp'
import { AlertsService } from '@/domain/services/AlertsService'
import { SolutionRepositoryHttp } from '@/dal/repositories/SolutionRepositoryHttp'
import { SolutionService } from '@/domain/services/SolutionService'
import { SubProblemRepositoryHttp } from '@/dal/repositories/SubProblemRepositoryHttp'
import { SubProblemService } from '@/domain/services/SubProblemService'

// const dependenciesStore = useDependenciesStore()

export function registerDependencies(app: App) {
  const http = new AxiosHttpClient()

  const propRepository = new ProblemRepositoryHttp(http)
  const problemService = new ProblemService(propRepository)

  const subPropRepository = new SubProblemRepositoryHttp(http)
  const subProblemService = new SubProblemService(subPropRepository)

  const alertsRepositoryHttp = new AlertsRepositoryHttp(http)
  const alertsService = new AlertsService(alertsRepositoryHttp)

  const solutionRepositoryHttp = new SolutionRepositoryHttp(http)
  const solutionService = new SolutionService(solutionRepositoryHttp)

  // provide global
  app.provide('problemService', problemService)
  app.provide('subProblemService', subProblemService)
  app.provide('alertsService', alertsService)
  app.provide('solutionService', solutionService)
  // dependenciesStore.dependenciesManager.addSingletonClass(ProblemService)
  // dependenciesStore.dependenciesManager.addSingletonClass(
  //   SolutionService as ClassDef<SolutionService>,
  // )
}
