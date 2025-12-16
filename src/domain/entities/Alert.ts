export default interface Alert extends Record<string, unknown> {
  id_warn: number
  warn_status: boolean
  warning_date: string
  id_animal: string
  id_troupeau: string
  disease_name: string
}
