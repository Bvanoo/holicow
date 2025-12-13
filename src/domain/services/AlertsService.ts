import { AlertsRepositoryHttp } from '@/dal/repositories/AlertsRepositoryHttp'

export class AlertsService {
  constructor(private repo: AlertsRepositoryHttp) {}

  async getAllAlertsByUserId(userId: string, lang: string, page: number, limit: number) {
    return await this.repo
      .getAllAlertsByUserId(userId, lang, limit, page)
      .catch((err) => console.error(err.message))
  }

  async getAlertById(idWarn: string, lang: string) {
    return await this.repo.getAlertById(idWarn, lang).catch((err) => console.error(err.message))
  }

  async updateStatus(idWarn: string) {
    return await this.repo.updateStatus(idWarn).catch((err) => console.error(err.message))
  }
}
