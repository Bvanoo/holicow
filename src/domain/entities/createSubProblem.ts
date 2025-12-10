export default interface CreateSubProblem extends Record<string, unknown> {
  sub_disease_name_FR: string
  sub_disease_name_DE?: string
  sub_disease_name_EN?: string
  sub_disease_name_NL?: string
  status_sub_disease: boolean
  diseaseId: string
  id_sub_disease?: string
}
/**  
 * "sub_disease_name_FR": "Grippe",
  "sub_disease_name_DE": "Grippe",
  "sub_disease_name_EN": "Flu",
  "sub_disease_name_NL": "Griep",
  "status_sub_disease": true,
  "diseaseId": 1 
  */
