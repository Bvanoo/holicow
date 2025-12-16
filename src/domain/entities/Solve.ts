import type Comment from './Comment'

export default interface Solve extends Record<string, unknown> {
  id_solve: number
  status_solve: boolean
  solution?: unknown
  commentaire?: Comment[]
  // id_solve: number
  // status_solve: boolean
  // diseases?: Problem[]
}
/**
 * "id_solve": 1,
        "status_solve": true,
        "diseases": {
          "id_disease": 1,
          "disease_name_FR": "Grippe aviaire",
          "disease_name_DE": "Vogelgrippe",
          "disease_name_EN": "Avian flu",
          "disease_name_NL": "Vogelpest",
          "est_healing_time": 14,
          "status_disease": true
 */
