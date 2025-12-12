
import type AlertPayload from '../entities/AlertPayload'
import type AlertWithProblem from '../entities/AlertWithProblem'
import type { StatusAlert } from '../entities/StatusAlert'

export default interface IAlertsRepository {
  getAllAlertsByUserId(
    userId: string,
    lang: string,
    limit: number,
    sortedBy: number,
    sortedOrder: number,
  ): Promise<AlertPayload>
  getAlertById(idWarn: string, lang: string): Promise<AlertWithProblem>

  updateStatus(idWarn: string): Promise<StatusAlert>
}
