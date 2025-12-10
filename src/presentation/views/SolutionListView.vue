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
        <TableContainer v-if="rows" :columns="columns" :data="(rows as Solution[])"
            :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="onActionDefined"
            :titleKey="'diseaseName'" @action="ButtonAction">
        </TableContainer>
        <div v-else>NO data from API</div>

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
    import { showSimpleErrorBox } from '@/domain/exception/utils';

    const route = useRoute();
    const userStore = useUserStore();

    const results = ref<Solution[] | void>();

    const currentPage = ref<number>(1)
    const pageSize = ref<number>(3)
    const rows = ref<Solution[]>()
    // const totalItems = ref<number>();
    const pageCount = ref<number>(0)

    const columns: Ref<{ key: string; label: string, icon: Component }[]> = ref([])
    const solutionService = inject<SolutionService>("solutionService");
    const splittedParams = (route.params.data as string).split("_")
    console.log("splittedParams", splittedParams)
    const idProblemSolution = splittedParams[0]

    columns.value = [
        { key: 'globalRating', label: 'Global rating', icon: ProblemIcon },
        { key: 'solution_description_FR', label: 'Description', icon: ProblemIcon },
        { key: 'commentCount', label: 'Commentaires', icon: CommentIcon },
        { key: 'farmerAlertCount', label: 'Alertes', icon: AlertsIcon },
        { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: AlertAvatarIcon },
        { key: 'actions', label: 'Actions', icon: AlertAvatarIcon },
    ]
    onMounted(async () => {

        //Si on vient du problemView, alors on utilise la route pour avoir les solutions par rapport à un PROBLEME id
        if (userStore.isProblemViewAction) {

            results.value = await solutionService?.getSolutionsByProblemId(idProblemSolution?.toString() as string, "fr", "farm", userStore.currentUserId as string, currentPage.value, pageSize.value, "", "")
            //Sinon on vient du subProblemView
        }
        else
            results.value = await solutionService?.getSolutionsBySubProblemId(idProblemSolution?.toString() as string, "fr", "farm", userStore.currentUserId as string, currentPage.value, pageSize.value, "", "")
        console.log(results)
        rows.value = results.value as Solution[]
        // A modifier dès que l'api est mise à jour (pagination)
        // totalItems.value = results.value?.
        //     pageSize.value = results.value!.totalPages + 1
        // if (totalItems.value)
        //     pageCount.value = totalItems.value / pageSize.value
        // console.log("results.value!.totalDiseases", results.value!.total);
        // console.log("results.value!.totalPages", results.value!.totalPages);
        // console.log("pageSize.value", pageSize.value);
        // console.log("pageCount.value", pageCount.value);

    })

    watch(currentPage, async () => {
        // if (sortKey.value) sortOrder.value = 'asc'
        results.value = await solutionService?.getSolutionsByProblemId(idProblemSolution?.toString() as string, "fr", "farm", userStore.currentUserId as string, currentPage.value, pageSize.value, "", "")

        rows.value = results.value as Solution[];
    })

    const filterResult = ref<Record<string, unknown>>();

    function ButtonAction(row: Solution) {
        router.push({
            name: 'solution',
            params: { data: row.id_solution }
        });
    }

    function onActionDefined(row: Solution) {
        return 'voir la solution'
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
