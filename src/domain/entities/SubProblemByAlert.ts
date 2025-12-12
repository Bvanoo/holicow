import type Solve from "./Solve";

export interface SubProblemByAlert{
    id_sub_disease: number,
    content: string,
    status_sub_disease: boolean,
    solve: Solve[],
    totalComments: number,
    totalAlerts: number,
    totalSimilarAvatarAlerts: number 
}