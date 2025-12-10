<script lang="ts" setup>
import { AxiosTransport } from '@/dal/testNewRepoStrat/AxiosHttpStrategy';
import SolutionRepository from '@/dal/testNewRepoStrat/ISolutionRepository';
import { SolutionService } from '@/dal/testNewRepoStrat/SolutionService';
import { AlertsService } from '@/domain/services/AlertsService'
import { inject, onMounted } from 'vue'

onMounted(async () => {
  // const alertsService = inject<AlertsService>('alertsService')
  // const alerts = await alertsService?.getAllAlertsByUserId('FARM001', 'fr', 1, 3)
  // console.log('alerts', alerts)
  // const axiosHttpStrategy = new AxiosTransport('http://localhost:3000/')
  // const solutionRepository = new SolutionRepository(axiosHttpStrategy)
  // const solutionService = new SolutionService(solutionRepository)
  // console.log(solutionService.createAdminSolution('admin', 'test', false, 1, 1 ))
})
</script>

<template>
  <!-- <div class="tesImage">
        <img class="logo" src="/logos/Herbagere.png">
        <img class="stars" src="/logos/star4.png">
    </div> -->
    <button @click="() => {
      const axiosHttpStrategy = new AxiosTransport('http://localhost:3000')
      const solutionRepository = new SolutionRepository(axiosHttpStrategy)
      const solutionService = new SolutionService(solutionRepository)
      console.log('SOLUTION CREE :: ' + solutionService.createAdminSolution('3cc7e361-c7f3-45c8-9097-979ddcb709f4', 'farmer', 'test', false, 1, 1))
    }"> Click to create a solution </button>
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
