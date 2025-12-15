export default interface CreateSolution extends Record<string, unknown> {
  solution_description_FR: string
  solution_description_NL: string
  solution_description_EN: string
  solution_description_DE: string
  status_solution: boolean
  id_subDisease: number
  id_disease: number
}
/**  
 * "sub_disease_name_FR": "Grippe",
  "sub_disease_name_DE": "Grippe",
  "sub_disease_name_EN": "Flu",
  "sub_disease_name_NL": "Griep",
  "status_sub_disease": true,
  "diseaseId": 1 
  */
