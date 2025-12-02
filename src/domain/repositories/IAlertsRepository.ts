import type AlertPayload from '../entities/AlertPayload'

export default interface IAlertsRepository {
  getAllAlertsByUserId(
    userId: string,
    lang: string,
    limit: number,
    sortedBy: number,
    sortedOrder: number,
  ): Promise<AlertPayload>
}
