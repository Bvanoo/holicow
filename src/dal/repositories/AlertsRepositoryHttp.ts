/* eslint-disable @typescript-eslint/no-unused-vars */
import type IAlertsRepository from '@/domain/repositories/IAlertsRepository'
import type AlertPayload from '@/domain/entities/AlertPayload'
import type AlertWithProblem from '@/domain/entities/AlertWithProblem'
import type { StatusAlert } from '@/domain/entities/StatusAlert'

export class AlertsRepositoryHttp implements IAlertsRepository {
  constructor(
    private http: {
      getAllAlertsByUserId: (url: string) => Promise<AlertPayload>
      getAlertById: (url: string) => Promise<AlertWithProblem>
      updateStatus: (url: string) => Promise<StatusAlert>
    },

  ) {}

  getAlertById(idWarn: string, lang: string): Promise<AlertWithProblem> {
    return this.http.getAlertById(
      `http://localhost:3000/alert/${idWarn}/${lang}`,

    )
  }

  getAllAlertsByUserId(
    userId: string,
    lang: string,
    limit: number,
    page: number,
  ): Promise<AlertPayload> {
    return this.http.getAllAlertsByUserId(
      `http://localhost:3000/alert/AllAlerte/${userId}/${lang}?page=${page}&limit=${limit}`,
    )
  }

  getAllResolvedAlertsByUserId(
    userId: string,
    lang: string,
    limit: number,
    page: number,
  ): Promise<AlertPayload> {
    return this.http.getAllAlertsByUserId(
      `http://localhost:3000/alert/AllAlerts/${userId}/${lang}?page=${page}&limit=${limit}`,
    )
  }

  updateStatus(idWarn: string): Promise<StatusAlert>{
    return this.http.updateStatus(`http://localhost:3000/alert/update/status/${idWarn}`)
  }
}
