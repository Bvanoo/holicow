import { AlertsRepositoryHttp } from '@/dal/repositories/AlertsRepositoryHttp'
import { showSimpleErrorBox } from '../exception/utils'

export class AlertsService {
  constructor(private repo: AlertsRepositoryHttp) {}

  async getAllAlertsByUserId(userId: string, lang: string, limit: number, page: number) {
    return await this.repo
      .getAllAlertsByUserId(userId, lang, page, limit)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  async getAlertById(idWarn: string, lang: string){
    return await this.repo
      .getAlertById(idWarn, lang)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  async updateStatus(idWarn: string){
    return await this.repo
    .updateStatus(idWarn)
    .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
