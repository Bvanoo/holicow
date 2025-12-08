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

export function registerDependencies(app: App) {
  const http = new AxiosHttpClient()

  const propRepository = new ProblemRepositoryHttp(http)
  const problemService = new ProblemService(propRepository)

  const alertsRepositoryHttp = new AlertsRepositoryHttp(http)
  const alertsService = new AlertsService(alertsRepositoryHttp)

  const solutionRepositoryHttp = new SolutionRepositoryHttp(http)
  const solutionService = new SolutionService(solutionRepositoryHttp)

  const subProblemRepositoryHttp = new SubProblemRepositoryHttp(http)
  const subProblemService = new SubProblemService(subProblemRepositoryHttp)

  // provide global
  app.provide('problemService', problemService)
  app.provide('alertsService', alertsService)
  app.provide('solutionService', solutionService)
  app.provide('subProblemService', subProblemService)
}
