import { AlertsRepositoryHttp } from '@/dal/repositories/AlertsRepositoryHttp'

export class AlertsService {
  constructor(private repo: AlertsRepositoryHttp) {}

  async getAllAlertsByUserId(userId: string, lang: string, limit: number, page: number) {
    return await this.repo.getAllAlertsByUserId(userId, lang, limit, page)
  }
}
