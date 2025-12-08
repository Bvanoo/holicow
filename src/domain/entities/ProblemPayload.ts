import type Problem from './Problem'
import type ProblemAdmin from './ProblemAdmin'

export default interface ProblemPayload {
  diseases: Problem[]
  //data pour l'admin car on nous renvoit pas le même dto entre farmer et admin
  data?: ProblemAdmin[]
  totalComments: number
  totalAlerts: number
  totalSimilarAvatarAlerts: number
  totalItems: number
  totalPages: number
  //data pour l'admin car on nous renvoit pas le même dto entre farmer et admin
  total?: number

  // diseases: Problem[]
  // total: number
  // page: number
  // totalPages: number
  /**{
  "diseases": [
    {
      "diseaseId": 1,
      "diseaseName": "Grippe aviaire",
      "commentCount": 1,
      "farmerAlertCount": 0,
      "similarAvatarAlertCount": 0
    },
    {
      "diseaseId": 2,
      "diseaseName": "Fièvre aphteuse",
      "commentCount": 0,
      "farmerAlertCount": 0,
      "similarAvatarAlertCount": 0
    }
  ],
  "totalComments": 1,
  "totalAlerts": 0,
  "totalSimilarAvatarAlerts": 0,
  "totalDiseases": 6,
  "totalPages": 3
} */
}
