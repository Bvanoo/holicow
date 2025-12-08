// import type ProblemPayload from './ProblemPayload'

export default interface SubProblem extends Record<string, unknown> {
  id_sub_disease: number
  sub_disease_name_FR: string
  sub_disease_name_DE?: string
  sub_disease_name_EN?: string
  sub_disease_name_NL?: string
  status_sub_disease?: boolean
  /**   "id_sub_disease": 1,
    "sub_disease_name_FR": "Grippe aviaire H5N1",
    "sub_disease_name_DE": "Vogelgrippe H5N1",
    "sub_disease_name_EN": "Avian flu H5N1",
    "sub_disease_name_NL": "Vogelpest H5N1",
    "status_sub_disease": true */
}
