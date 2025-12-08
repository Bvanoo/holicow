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
                        { label: 'Alertes/Avatar', value: 'avatarAlerts' },
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
        <TableContainer :columns="columns" :data="(rows as SubProblem[])"
            :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="onActionDefined"
            :titleKey="'subDiseaseName'" @action="ButtonAction">
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

    import { onMounted, ref, type Ref, inject, watch, type Component } from 'vue';
    import { ProblemService } from '@/domain/services/ProblemService';
    import FilterPanel from '../components/Filter/FilterPanel.vue';
    import FilterSelectComponent from '../components/Filter/FilterSelectComponent.vue';
    import FilterOrderSwitchComponent from '../components/Filter/FilterOrderSwitchComponent.vue';
    import TableContainer from '../components/Table/TableContainer.vue';
    import { useUserStore } from '@/stores/User';
    import ProblemIcon from '../components/icons/ProblemIcon.vue';
    import CommentIcon from '../components/icons/CommentIcon.vue';
    import AlertsIcon from '../components/icons/AlertsIcon.vue';
    import AlertAvatarIcon from '../components/icons/AlertAvatarIcon.vue';
    import type SubProblem from '@/domain/entities/SubProblem';
    import { useRoute } from 'vue-router';
    import router from '@/router/index';
    import type SubProblemPayload from '@/domain/entities/SubProblemPayload';
    import type SubProblemAdmin from '@/domain/entities/SubProblemAdmin';
    // import type SubProblemPayload from '@/domain/entities/SubProblemPayload';

    const userStore = useUserStore();

    const results = ref<SubProblemPayload | SubProblemAdmin[] | void>();

    const currentPage = ref<number>(1)
    const pageSize = ref<number>(3)
    const rows = ref<SubProblem[] | SubProblemAdmin[] | void>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const totalItems = ref<number>();
    const pageCount = ref<number>(0)

    const columns: Ref<{ key: string; label: string, icon: Component }[]> = ref([])
    const problemService = inject<ProblemService>("problemService");
    const route = useRoute();
    const idProblem = route.params.data as string
    columns.value = [
        { key: 'subDiseaseName', label: 'Nom', icon: ProblemIcon },
        { key: 'commentCount', label: 'Commentaires', icon: CommentIcon },
        { key: 'farmerAlertCount', label: 'Alertes', icon: AlertsIcon },
        { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: AlertAvatarIcon },
        { key: 'actions', label: 'Actions', icon: AlertAvatarIcon },
    ]
    onMounted(async () => {
        if (userStore?.currentProfile?.role === "Administrator") {
            columns.value = [
                { key: 'sub_disease_name_FR', label: 'Nom', icon: ProblemIcon },
                { key: 'status_sub_disease', label: 'Status', icon: AlertAvatarIcon },
                { key: 'actions', label: 'Actions', icon: AlertAvatarIcon },
            ]
            results.value = await problemService?.getSubProblemByProblemIdAdmin(idProblem/*, currentPage.value, pageSize.value, "", ""*/)

            rows.value = results.value as SubProblemAdmin[]
        }
        else {
            columns.value = [
                { key: 'diseaseName', label: 'Nom', icon: ProblemIcon },
                { key: 'commentCount', label: 'Commentaires', icon: CommentIcon },
                { key: 'farmerAlertCount', label: 'Alertes', icon: AlertsIcon },
                { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: AlertAvatarIcon },
                { key: 'actions', label: 'Actions', icon: AlertAvatarIcon },
            ]
            results.value = await problemService?.getSubProblemByProblemId(userStore.currentProfile?.profilId as string, idProblem, currentPage.value, pageSize.value, "", "")
            console.log(results)
            rows.value = results.value?.subDiseases as SubProblem[]
        }
        // // A modifier dès que l'api est mise à jour (pagination)
        // totalItems.value = results.value?.totalDiseases
        // pageSize.value = results.value!.totalPages + 1
        // if (totalItems.value)
        //     pageCount.value = totalItems.value / pageSize.value
        // console.log("results.value!.totalDiseases", results.value!.totalDiseases);
        // console.log("results.value!.totalPages", results.value!.totalPages);
        // console.log("pageSize.value", pageSize.value);
        // console.log("pageCount.value", pageCount.value);

    })

    watch(currentPage, async () => {
        if (userStore?.currentProfile?.role === "Administrator") {
            results.value = await problemService?.getSubProblemByProblemIdAdmin(idProblem/*, currentPage.value, pageSize.value, "", ""*/)
            rows.value = results.value
        }
        else {
            results.value = await problemService?.getSubProblemByProblemId(userStore.currentProfile?.profilId as string, idProblem, currentPage.value, pageSize.value, "", "")
            rows.value = results.value!.subDiseases
        }
    })

    const filterResult = ref<Record<string, unknown>>();

    function ButtonAction(row: SubProblem | SubProblemAdmin) {
        userStore.isProblemViewAction = false;
        if (userStore?.currentProfile?.role === "Administrator") {
            router.push({
                name: 'solutionsList',
                params: { data: (row as SubProblemAdmin).id_sub_disease }
            });
        }
        else {
            router.push({
                name: 'solutionsList',
                params: { data: (row as SubProblem).diseaseId }
            });
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function onActionDefined(row: SubProblem) {
        return 'Voir les solutions'
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
