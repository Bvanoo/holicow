import type Solution from './Solution'
import type Solve from './Solve'

export default interface SolutionPayload {
  data: Solution[]
  solves: Solve[]
  // data: Solution[]
  // total: number
  // page: number
  // totalPages: number
}
/**
 * [
  {
    "id_solution": 1,
    "status_solution": true,
    "solution_description_FR": "Isoler immédiatement les animaux infectés et désinfecter toutes les surfaces. Contacter un vétérinaire pour un diagnostic précis.",
    "solution_description_NL": "Isoleer geïnfecteerde dieren onmiddellijk en desinfecteer alle oppervlakken. Neem contact op met een dierenarts voor een nauwkeurige diagnose.",
    "solution_description_EN": "Immediately isolate infected animals and disinfect all surfaces. Contact a veterinarian for accurate diagnosis.",
    "solution_description_DE": "Infizierte Tiere sofort isolieren und alle Oberflächen desinfizieren. Kontaktieren Sie einen Tierarzt für eine genaue Diagnose.",
    "solves": [
      {
        "id_solve": 1,
        "status_solve": true,
        "diseases": {
          "id_disease": 1,
          "disease_name_FR": "Grippe aviaire",
          "disease_name_DE": "Vogelgrippe",
          "disease_name_EN": "Avian flu",
          "disease_name_NL": "Vogelpest",
          "est_healing_time": 14,
          "status_disease": true
        },
        "comments": []
      }
    ]
  }
]
 */
