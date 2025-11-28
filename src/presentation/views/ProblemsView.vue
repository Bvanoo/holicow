<template>
    <!-- <ChatBubble /> -->
    <section style="padding: 16px">
        <CustomTable :columns="columns" :data="rows" primary-key="disease_name_FR">
            <!-- <template #footer>
        <n-button type="primary">Action footer</n-button>
      </template> -->
        </CustomTable>
        <div class="table-footer">
            <n-pagination v-model:page="currentPage" :page-size="pageSize" :item-count="totalItems" simple />
            <slot name="footer"></slot>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref, type Ref, inject, watch } from 'vue'
    import CustomTable from '../components/ProblemTable.vue'
    import { ProblemService } from '@/domain/services/ProblemService'
    import type ProblemPayload from '@/domain/entities/ProblemPayload';
    import type Problem from '@/domain/entities/Problem';
    const results = ref<ProblemPayload | void>();

    const currentPage = ref<number>(1)
    const pageSize = ref<number>(3)
    const rows = ref<Problem[] | undefined>()
    const totalItems = ref<number>();

    const columns: Ref<{ key: string; label: string }[]> = ref([])
    const problemService = inject<ProblemService>("problemService");

    onMounted(async () => {
        results.value = await problemService?.getAllProblems(currentPage.value, pageSize.value, "", "")
        console.log(results)

        columns.value = [
            { key: 'disease_name_FR', label: 'Nom' },
            { key: 'comments', label: 'Commentaires' },
            { key: 'alerts', label: 'Alertes' },
            { key: 'avatarAlerts', label: 'Alertes/Avatar' },
        ]

        pageSize.value = Math.ceil(results.value!.total / results.value!.totalPages) + 1
        console.log("results.value!.total", results.value!.total);
        console.log("results.value!.totalPages", results.value!.totalPages);
        console.log(" p,ageSize.value", pageSize.value);

        rows.value = results.value!.data
        totalItems.value = results.value!.total;

    })

    watch(currentPage, async () => {
        // if (sortKey.value) sortOrder.value = 'asc'
        results.value = await problemService?.getAllProblems(currentPage.value, pageSize.value, "", "")
        rows.value = results.value!.data;
    })

    // interface ProblemDTO {
    //     id: number
    //     name: string
    //     comments: number
    //     alerts: number
    //     avatarAlerts: number
    // }

    // const rows = ref<ProblemDTO[]>([
    //     { id: 0, name: 'Mastite', comments: 1, alerts: 2, avatarAlerts: 12 },
    //     { id: 1, name: 'Cétose', comments: 0, alerts: 0, avatarAlerts: 3 },
    //     { id: 2, name: 'Médose', comments: 2, alerts: 8, avatarAlerts: 1 },
    //     { id: 3, name: 'Acidose', comments: 3, alerts: 4, avatarAlerts: 5 },
    //     { id: 4, name: 'Champignite', comments: 1, alerts: 4, avatarAlerts: 14 },
    //     { id: 5, name: 'rhume', comments: 14, alerts: 2, avatarAlerts: 9 },
    //     { id: 6, name: 'Unnamed', comments: 2, alerts: 4, avatarAlerts: 5 },
    // ])
</script>

<style scoped>
    .table-footer {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 16px 0;
        padding-bottom: 12px;
    }
</style>
