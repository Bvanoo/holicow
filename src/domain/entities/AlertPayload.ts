import type Alert from './Alert'

export default interface AlertPayload {
  data: Alert[]
  total: number
  page: number
  limit: number
  totalPages: number
}
