<template>
  <SolutionItem :globalNote="4" :myNote="3" :badgeColor="'#FF0000'" :prevention="(results?.content)"
    :userCommentContent="'test'" :problemName="problemName" :subproblemName="subProblemName" :comments="coms" :items="[
      {
        id: 110,
        disease: 'Mamite - Mammite subclinique',
        description: 'une description complète de l\'objet ciblé',
        category: 'a',
        alerts: 11,
        avatar: 'thu12345',
      },

    ]" />
</template>

<script setup lang="ts">
  import type Comment from '@/domain/entities/Comment';
  import SolutionItem from '../components/SolutionItem.vue';
  import { useRoute } from 'vue-router';
  import { inject, onMounted, ref } from 'vue';
  import type Solution from '@/domain/entities/Solution';
  import { SolutionService } from '@/domain/services/SolutionService';
  const route = useRoute();
  const idSolution = (route.params.data!)[0] as string;
  const problemName = (route.params.data!)[1] as string
  const subProblemName = route.params.data ? (route.params.data)[2] as string : undefined

  const solutionService = inject<SolutionService>("solutionService");

  const results = ref<Solution | void>()

  const coms = ref<Comment[]>([])

  onMounted(async () => {
    results.value = await solutionService?.getSolutionById(idSolution, "fr")
      .then(r => {
        const comExtract = r?.solves!.filter(
          (item => item.commentaire && item.commentaire.length > 0))

        if (comExtract)
          for (let i = 0; i < comExtract.length; i++) {
            console.log("Le commentaire extrait : ", comExtract[i]?.commentaire)
            coms.value.push((comExtract[i]?.commentaire![0]) as Comment)
            // coms.value?.concat(comExtract[i]?.commentaire)
          }
        return r
      })
    console.log(results.value)

    // console.log(results);

  })
</script>
