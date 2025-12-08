import type Problem from './Problem'

export default interface ProblemPayload {
  diseases: Problem[]
  totalComments: 1
  totalAlerts: 0
  totalSimilarAvatarAlerts: 0
  totalDiseases: 6
  totalPages: 3

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
