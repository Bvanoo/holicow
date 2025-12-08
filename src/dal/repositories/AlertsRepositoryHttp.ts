/* eslint-disable @typescript-eslint/no-unused-vars */
import type Solution from '@/domain/entities/Solution'
import type IAlertsRepository from '@/domain/repositories/IAlertsRepository'
import type AlertPayload from '@/domain/entities/AlertPayload'

export class AlertsRepositoryHttp implements IAlertsRepository {
  constructor(
    private http: {
      getAllAlertsByUserId: (url: string) => Promise<AlertPayload>
    },
  ) {}
  getAllAlertsByUserId(
    userId: string,
    lang: string,
    limit: number,
    page: number,
  ): Promise<AlertPayload> {
    return this.http.getAllAlertsByUserId(
      `http://localhost:3000/alert/AllAlerte/${userId}/${lang}?page=${page}&limit=${limit}`,
      // 'http://localhost:3000/alert/AllAlerte/FARM001/fr?page=1&limit=2',
    )
  }
}
