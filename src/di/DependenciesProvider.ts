import { ProblemService } from '../domain/services/ProblemService'
import { ProblemRepositoryHttp } from '../dal/repositories/ProblemRepositoryHttp'
import { AxiosHttpClient } from '../dal/http/AxiosHttpClient'
import type { App } from 'vue'
import { AlertsRepositoryHttp } from '@/dal/repositories/AlertsRepositoryHttp'
import { AlertsService } from '@/domain/services/AlertsService'

export function registerDependencies(app: App) {
  const http = new AxiosHttpClient()

  const propRepository = new ProblemRepositoryHttp(http)
  const problemService = new ProblemService(propRepository)

  const alertsRepositoryHttp = new AlertsRepositoryHttp(http)
  const alertsService = new AlertsService(alertsRepositoryHttp)

  // provide global
  app.provide('problemService', problemService)
  app.provide('alertsService', alertsService)
}
