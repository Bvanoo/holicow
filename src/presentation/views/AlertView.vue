<template>
    <!-- <div class="tesImage">
          <img class="logo" src="/logos/Herbagere.png">
          <img class="stars" src="/logos/star4.png">
      </div> -->
    <div class="alert">
      <div class="title">Details de l'alerte</div>

      
 

        <TableContainer class="tc" :columns="columns" :data="(row as AlertWithProblem[])"
                :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="() => row.warn_status == false ?`Marquer l'alerte comme résolue` : ''"
                :titleKey="null" @action="resolution">
        
            </TableContainer>
            <div v-if="checkIfSubDisease(row) !== 0 && solutionExist == false">
              <div class="title">Liste des sous maladies</div>
                <!-- <div>Maladie : {{ row[0].disease[0].content }}</div> -->

                <TableContainer v-if="resSubDisease" class="" :columns="columnsSubDisease" :data="(resSubDisease as SubProblemByAlert[])"
                    :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="() => 'Choisir'"
                    :titleKey="null" @action="showSolution">
                </TableContainer>
            </div>
            <div v-if="solutionExist == true || (solution && !resSubDisease)">
                <div class="title">Liste des solution</div>
                <TableContainer class="" :columns="columnsSolution" :data="(solution as SolutionBySubDisease[])"
                    :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :isAlert="true" :actionLabel="() => 'Choisir'" 
                    :actionLabelOne="'Proposer une solution'"
                    :titleKey="null" @action="choseSolution">
                </TableContainer>
            </div>
        
        
    </div>
  </template>
  
  <script setup lang="ts">
  
  import { onMounted, ref, type Ref, inject, type Component } from 'vue'
    import { AlertsService } from '@/domain/services/AlertsService'
    import { ProblemService } from '@/domain/services/ProblemService';
    import type Alert from '@/domain/entities/Alert';
    import TableContainer from '../components/Table/TableContainer.vue';
    import { useUserStore } from '@/stores/User';
    import type AlertPayload from '@/domain/entities/AlertPayload';
    import router from '@/router/index';
    import { useRoute } from 'vue-router';
    import type AlertWithProblem from '@/domain/entities/AlertWithProblem';
    import type SubProblem from '@/domain/entities/SubProblem';
    import type SubProblemPayload from '@/domain/entities/SubProblemPayload';
    import type ProblemByAlert from '@/domain/entities/ProblemByAlert';
    import type { SubProblemByAlert } from '@/domain/entities/SubProblemByAlert';
    import SubProblemsView from './SubProblemsView.vue';
    import { useNotification } from "naive-ui";
    import type { SolutionBySubDisease } from '@/domain/entities/SolutionBySubDisease';
    import type { SolutionService } from '@/domain/services/SolutionService';
import type { updateStatusSolve } from '@/domain/entities/updateStatusSolve';

    const notification = useNotification();
    const userStore = useUserStore();
  
    const alertService = inject<AlertsService>("alertsService");
    const problemService = inject<ProblemService>('problemService')
    const solutionService = inject<SolutionService>('solutionService')
    const route = useRoute();
    const paramsRoute = route.params.data as string
    const res = ref<AlertWithProblem | void>();
    const row = ref<AlertWithProblem[]>([]);
    const resDisease = ref<ProblemByAlert[]>([]);
    const resSubDisease = ref<SubProblemByAlert[]>([]);
    // const resSubDiseaseWithStat = ref<SubProblemPayload[]>([]);
    let solution = ref<void | SolutionBySubDisease | undefined>();
    const sol = ref<SolutionBySubDisease[]>([]);
    const columns: Ref<{ key: string; label: string, icon: Component | null}[]> = ref([])
    let solutionExist = ref<boolean>(false);
    columns.value = [
        { key: 'warning_date', label: 'Date', icon: null },
        { key: 'id_animal', label: 'Id animal', icon: null },
        { key: 'id_troupeau', label: 'Id troupeau', icon: null },
        { key: 'disease_name', label: 'Maladie', icon: null },
        { key : 'nbrSolutionSelect', label: 'Solution(s) Sélectionnée(s)', icon: null},
        { key: 'actions', label: 'Actions', icon: null },
    ]
    const columnsSubDisease: Ref<{ key: string; label:string, icon: Component | null}[]> = ref([])
    columnsSubDisease.value = [
        { key: 'content', label: 'Dénomination', icon: null},
        { key: 'totalComments', label: 'Nombre de vos commentaires', icon: null},
        { key: 'totalAlerts', label: 'Nombre de vos alerts', icon: null},
        { key: 'totalSimilarAvatarAlerts', label: `Nombre d'alertes pour le même avatar`, icon: null},
        { key: 'actions', label: 'Actions', icon: null },
    ]
    const columnsSolution: Ref<{ key: string; label:string, icon: Component | null}[]> = ref([])
    columnsSolution.value = [
        { key: 'solution_description_FR', label: 'Dénomination', icon: null},
        { key: 'commentCount', label: 'Nombre de vos commentaires', icon: null},
        { key: 'farmerAlertCount', label: 'Nombre de vos alerts', icon: null},
        { key: 'similarAvatarAlertCount', label: `Nombre d'alertes pour le même avatar`, icon: null},
        { key: 'actions', label: 'Actions', icon: null },
    ]

    onMounted(async () => {
      res.value = await alertService?.getAlertById(paramsRoute, 'fr') as AlertWithProblem;
      row.value.push(res.value)
      resDisease.value.push(res.value.disease[0]!)
      resSubDisease.value.push(...(res.value?.disease?.[0]?.sub_disease ?? []))
      row.value = row.value.map(alert => {
        alert.warning_date = new Date(alert.warning_date).toLocaleDateString('fr-FR'),
        alert.id_troupeau = alert.id_troupeau == null ? 'none' : alert.id_troupeau,
        alert.id_animal = alert.id_animal == null ? 'none' : alert.id_animal,
        alert.disease_name = alert.disease[0]!.content,
        alert.nbrSolutionSelect = nbrSolSelect(alert)
        return alert;
            }
        )

    })

    async function choseSolution(solutions: SolutionBySubDisease){
        console.log(solutions)
        // let solution: updateStatusSolve;
        
        // console.log(payload)
        const res = await solutionService?.putStatusSolve(paramsRoute, solutions);
        notifyStatusChange(res?.status_solve)
    }

    async function showSolution(row: SubProblemByAlert){
        const idUser = userStore.currentUserId;
        const idSubDisease = row.id_sub_disease.toString()
        const role = userStore.currentProfile?.role ? userStore.currentProfile?.role : 'farmer'
        solution.value = await solutionService?.getSolutionByProblemFromAlert(idSubDisease, 'fr', role, idUser) as SolutionBySubDisease
        if(solution.value.id_solution != 0){
            solutionExist.value = true;
        }
    }

    async function resolution(row: Alert){
        const res = await alertService?.updateStatus(row.id_warn.toString());
        notifyStatusChange(res?.alert.warn_status)
    }

    function notifyStatusChange(status: boolean | undefined) {
        notification.success({
            title: "Mise à jour du statut",
            description: status
            ? "Le statut a bien été activé."
            : "Le statut a été désactivé."
        });
    }

    function nbrSolSelect(alert : AlertWithProblem){
        let nbr = 0;
        alert!
            .disease[0]?.sub_disease?.map( d => {
                return nbr += d.solve.length;
            })
       
        return nbr;
    }

    function checkIfSubDisease(data: AlertWithProblem[]){
        const test = data.map(alert => {
             return alert.disease[0]?.sub_disease?.length
        })
        return test[0];
    }
  
  
  </script>
  <style lang="scss" scoped>
    .alert{
      margin-left: 5vw !important;
      margin-top: 20vh !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 2px;
      width: 90vw !important;
    }
  
    .title{
      font-size: large;
      font-weight: bold;
      color: white;
    }
  
  </style>