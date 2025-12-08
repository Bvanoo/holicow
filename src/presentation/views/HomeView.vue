<script lang="ts" setup>
import type CreateProblem from '@/domain/entities/createProblem'
import type UpdateProblem from '@/domain/entities/updateProblem'
import { AlertsService } from '@/domain/services/AlertsService'
import { ProblemService } from '@/domain/services/ProblemService'
import { inject, onMounted } from 'vue'

onMounted(async () => {
  //récuprer les alerts d'un farmer avec son id
  // const alertsService = inject<AlertsService>('alertsService')
  // const alerts = await alertsService?.getAllAlertsByUserId('FARM001', 'fr', 1, 2)
  // console.log('alerts', alerts)

  //get les problemes par id farmer
  // try {
  //   const problemService = inject<ProblemService>('problemService')
  //   const problemsByFarmer = await problemService?.getAllProblems('FARM001', 1, 10)
  //   console.log('problemsByFarmer', problemsByFarmer)
  // } catch (e) {
  //   console.error('Error fetching problems by farmer:', e)
  // }

  //creer un nouveau problem
  // try {
  //   const role = 'admin'
  //   const problemService = inject<ProblemService>('problemService')
  //   const createProblemDTO: CreateProblem = {
  //     disease_name_FR: 'momo',
  //     disease_name_DE: 'momo',
  //     disease_name_EN: 'momo',
  //     disease_name_NL: 'momo',
  //     est_healing_time: 30,
  //     status_disease: true,
  //   }

  //   const result = await problemService?.createProblem(role, createProblemDTO)

  //   console.log('Create PROBLEM', result)
  // } catch (e) {
  //   console.error('Erreur dans createProblem :', e)
  // }


  // try {
  //   const problemService = inject<ProblemService>('problemService')
  //   const role = 'admin'
  //   const idProblem = '1'
  //   const problemUpdateDTO: UpdateProblem = {
  //     disease_name_FR: 'Diabète type 5',
  //     disease_name_DE: 'Typ-5-Diabetes',
  //     disease_name_EN: 'Type 5 Diabetes',
  //     disease_name_NL: 'Diabetes type 5',
  //     est_healing_time: 18,
  //     status_disease: true,
  //   }
  //   const detail = await problemService?.updateProblem(role, idProblem, problemUpdateDTO)

  //   console.log('Update PROBLEM ID=1', detail)
  // } catch (e) {
  //   console.error('Erreur dans getProblemById :', e)
  // }


  try {
    const problemService = inject<ProblemService>('problemService')
    const role = 'admin'
    const idProblem = 1

    const detail = await problemService?.toggleProblemStatus(role, idProblem)

    console.log('Update PROBLEM ID=1', detail)
  } catch (e) {
    console.error('Erreur dans getProblemById :', e)
  }

})
</script>

<template>
  <!-- <div class="tesImage">
        <img class="logo" src="/logos/Herbagere.png">
        <img class="stars" src="/logos/star4.png">
    </div> -->
  <div class="text-3xl font-bold underline">HomeView</div>
</template>

<style lang="scss" scoped>
// .tesImage {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: relative;

//     img {
//         width: 96px;
//         height: 96px;
//         border-radius: 100%;
//     }

//     .logo {
//         background-color: rgba(255, 0, 0, 0.189);
//     }

//     .stars {
//         position: absolute;
//         top: -10px;

//     }
// }
</style>
