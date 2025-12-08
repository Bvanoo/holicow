<template>
    <SolutionItem :globalNote="4" :myNote="3" :badgeColor="'#FF0000'" :comments="comments"
        :prevention="results?.content" :userCommentContent="'test'" :items="[
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
    const idSolution = route.params.data as string;

    const solutionService = inject<SolutionService>("solutionService");

    const results = ref<Solution | void>()

    const comments: Comment[] = [{
        id: "1",
        content: "string",
        avatar: {
            name: "string",
            image: "string",
            userTypePicture: "string"
        },
        date: new Date(),

    }]

    onMounted(async () => {
        results.value = await solutionService?.getSolutionById(idSolution, "fr")
        console.log(results);

    })
</script>