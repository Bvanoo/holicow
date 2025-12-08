<template>
    <!-- <ChatBubble /> -->
    <section style="padding: 16px">
        <Transition name="fade-slide" tag="FilterPanel" appear>
            <FilterPanel title="Filtres" @submit="handleSubmitFilter" class="filter">
                <div class="filter__order">
                    <!-- Composant 1 -->
                    <FilterSelectComponent class="filter__order-select" field-name="colonne" :options="[
                        { label: 'Nom', value: 'disease_name_FR' },
                        { label: 'Alertes', value: 'alerts' },
                        { label: 'Commentaires', value: 'comments' },
                        { label: 'Alertes/Avatar', value: 'avatarAlerts' }
                    ]"></FilterSelectComponent>
                    <!-- Composant 2 -->
                    <FilterOrderSwitchComponent fieldName="order"></FilterOrderSwitchComponent>
                </div>
                <!-- <div class="filter__search">
                <span>Rechercher :</span> 
            Composant 3
            <FilterInputComponent fieldName="test"></FilterInputComponent>
            </div> -->
            </FilterPanel>
        </Transition>
        {{ filterResult }}
        <TableContainer :columns="columns" :data="(rows as Solution[])"
            :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="onActionDefined"
            :titleKey="'diseaseName'" @action="ButtonAction">
        </TableContainer>

        <!-- <ProblemTable :columns="columns" :data="rows" primary-key="disease_name_FR"> -->
        <!-- <template #footer>
        <n-button type="primary">Action footer</n-button>
      </template> -->
        <!-- </ProblemTable> -->
        <div class="table-footer">
            <n-pagination v-model:page="currentPage" :page-count="pageCount" simple />
            <slot name="footer"></slot>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { onMounted, ref, type Ref, inject, watch, type Component } from 'vue'
    import type SolutionPayload from '@/domain/entities/SolutionListPayload';
    import FilterPanel from '../components/Filter/FilterPanel.vue';
    import FilterSelectComponent from '../components/Filter/FilterSelectComponent.vue';
    import FilterOrderSwitchComponent from '../components/Filter/FilterOrderSwitchComponent.vue';
    import TableContainer from '../components/Table/TableContainer.vue';
    import { useUserStore } from '@/stores/User';
    import ProblemIcon from '../components/icons/ProblemIcon.vue';
    import CommentIcon from '../components/icons/CommentIcon.vue';
    import AlertsIcon from '../components/icons/AlertsIcon.vue';
    import AlertAvatarIcon from '../components/icons/AlertAvatarIcon.vue';
    import router from '@/router/index';
    import type Solution from '@/domain/entities/Solution';
    import type { SolutionService } from '@/domain/services/SolutionService';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const userStore = useUserStore();

    const results = ref<Solution[] | void>();

    const currentPage = ref<number>(1)
    const pageSize = ref<number>(3)
    const rows = ref<Solution[]>()
    const totalItems = ref<number>();
    const pageCount = ref<number>(0)

    const columns: Ref<{ key: string; label: string, icon: Component }[]> = ref([])
    const solutionService = inject<SolutionService>("solutionService");
    const idProblemSolution = route.params.data as string

    columns.value = [
        { key: 'globalRating', label: 'Global rating', icon: ProblemIcon },
        { key: 'name', label: 'Nom', icon: ProblemIcon },
        { key: 'solution_description_FR', label: 'Description', icon: ProblemIcon },
        { key: 'commentCount', label: 'Commentaires', icon: CommentIcon },
        { key: 'farmerAlertCount', label: 'Alertes', icon: AlertsIcon },
        { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: AlertAvatarIcon },
    ]
    onMounted(async () => {
        results.value = await solutionService?.getSolutionsByProblemId(idProblemSolution, "fr", "farm", userStore.currentUserId as string, currentPage.value, pageSize.value, "", "")
        console.log(results)
        rows.value = results.value
        // A modifier dès que l'api est mise à jour (pagination)
        totalItems.value = results.value?.total
        pageSize.value = results.value!.totalPages + 1
        if (totalItems.value)
            pageCount.value = totalItems.value / pageSize.value
        console.log("results.value!.totalDiseases", results.value!.total);
        console.log("results.value!.totalPages", results.value!.totalPages);
        console.log("pageSize.value", pageSize.value);
        console.log("pageCount.value", pageCount.value);

    })

    watch(currentPage, async () => {
        // if (sortKey.value) sortOrder.value = 'asc'
        results.value = await solutionService?.getSolutionsBySubProblemId(userStore.currentUserId as string, currentPage.value, pageSize.value, "", "")

        rows.value = results.value!.data;
    })

    const filterResult = ref<Record<string, unknown>>();

    function ButtonAction(row: Solution) {
        if (row.SubDiseaseExisting) {
            router.push({
                name: 'sub problems',
                params: { data: row.id_solution }
            });
        } else {
            //vers solution
        }
    }

    function onActionDefined(row: Solution) {
        return 'voir les solutions'
    }

    function handleSubmitFilter(payload: Record<string, unknown>) {
        filterResult.value = payload
        console.log(payload)
    }

</script>

<style lang="scss" scoped>
    .table-footer {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 16px 0;
        padding-bottom: 12px;
    }
</style>
