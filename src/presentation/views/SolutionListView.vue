<template>
    <!-- <ChatBubble /> -->
    <section style="padding: 16px">
        <h1>{{ solutionSubProblemName }}</h1>
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
        <section v-if="userStore.currentProfile?.role === 'Administrator'">
            <n-button class="view__header__buttonProbleme" tertiary type="primary" color="white" size="large"
                @click="openCreate">
                Créer une solution
            </n-button>
        </section>
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
            <n-pagination v-model:page="currentPage" :page-count="totalPage" simple />
            <slot name="footer"></slot>
        </div>
    </section>
    <GenericFormModal v-model:show="showModal" :title="modalTitle" :adapter="solutionAdapter" @submit="handleSubmit">

        <n-form-item label="Nom du problème">
            <n-input :disabled="true" v-model:value="solutionSubProblemName" />
        </n-form-item>
        <n-form-item label="Nom du sous-problème" path="sub_disease_name_FR">
            <n-input v-model:value="solutionAdapter.form.value.solution_description_FR" />
        </n-form-item>
        <n-form-item label="Status" path="status_sub_disease">
            <n-select v-model:value="solutionAdapter.form.value.status_solution" :options="statusOptions" />
        </n-form-item>
    </GenericFormModal>
</template>

<script setup lang="ts">

    import { onMounted, ref, type Ref, inject, watch, type Component, computed, shallowRef } from 'vue'
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
    import { createSubProblemFormAdapter } from '@/domain/form/subProblem/SubProblemFormAdapter';
    import GenericFormModal from '../components/GenericFormModal.vue';
    import { createSolutionFormAdapter } from '@/domain/form/solutionFormAdapter/SolutionFormAdapter';

    const statusOptions = [{
        label: 'Activer',
        value: 'true'
    }, {
        label: 'Désactiver',
        value: 'false'
    }]
    const route = useRoute();
    const userStore = useUserStore();

    const results = ref<Solution[] | void>();

    const currentPage = ref<number>(1)
    const totalPage = ref<number>(0)
    const limitItemsPage = ref<number>(3)
    const rows = ref<Solution[]>()
    // const totalItems = ref<number>();

    const columns: Ref<{ key: string; label: string, icon: Component }[]> = ref([])
    const solutionService = inject<SolutionService>("solutionService");
    console.log(route.params.data)
    const idProblemSolution = ref<string>()
    const idSubProblemSolution = ref<string>()
    const solutionSubProblemName = ref<string>()
    if (route.params.data) {
        idProblemSolution.value = route.params.data[0]
        idSubProblemSolution.value = route.params.data[1]
        solutionSubProblemName.value = route.params.data[2]
    }

    const showModal = ref(false)
    const solutionAdapter = createSolutionFormAdapter()

    columns.value = userStore.currentProfile?.role === "Administrator" ? [
        { key: 'globalRating', label: 'Global rating', icon: shallowRef(ProblemIcon) },
        { key: 'solution_description_FR', label: 'Description', icon: shallowRef(ProblemIcon) },
        { key: 'actions', label: 'Actions', icon: shallowRef(AlertAvatarIcon) },
    ] : [
        { key: 'globalRating', label: 'Global rating', icon: shallowRef(ProblemIcon) },
        { key: 'solution_description_FR', label: 'Description', icon: shallowRef(ProblemIcon) },
        { key: 'commentCount', label: 'Commentaires', icon: shallowRef(CommentIcon) },
        { key: 'farmerAlertCount', label: 'Alertes', icon: shallowRef(AlertsIcon) },
        { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: shallowRef(AlertAvatarIcon) },
        { key: 'actions', label: 'Actions', icon: shallowRef(AlertAvatarIcon) },
    ]
    onMounted(async () => {

        //Si on vient du problemView, alors on utilise la route pour avoir les solutions par rapport à un PROBLEME id
        if (userStore.isProblemViewAction) {
            results.value = await solutionService?.getSolutionsByProblemId(idSubProblemSolution.value?.toString() as string, "fr", "farm", userStore.currentUserId as string, currentPage.value, limitItemsPage.value, "", "")
        }
        else
            results.value = await solutionService?.getSolutionsBySubProblemId(idSubProblemSolution.value?.toString() as string, "fr", "farm", userStore.currentUserId as string, currentPage.value, limitItemsPage.value, "", "")
        //Calcul pagination
        totalPage.value = 1
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
        results.value = await solutionService?.getSolutionsByProblemId(idSubProblemSolution.value?.toString() as string, "fr", "farm", userStore.currentUserId as string, currentPage.value, limitItemsPage.value, "", "")

        rows.value = results.value as Solution[];
    })

    const mode = ref<'create' | 'update'>('create')
    const modalTitle = computed(() =>
        mode.value === 'create' ? 'Créer une solution' : 'Modifier la solution',
    )

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

    const openCreate = () => {
        mode.value = 'create'

        solutionAdapter.reset()
        solutionAdapter.form.value.id_sub_disease = idSubProblemSolution.value
        //trouver l'id problem de la solution

        solutionAdapter.form.value.id_disease = idSubProblemSolution.value
        showModal.value = true
    }
    async function handleSubmit() {
        if (mode.value === 'create') {
            const created = await solutionAdapter.create()
            console.log('Created :', created)
            // results.value = await solutionService?.getSubProblemByProblemIdAdmin(idProblemSolution.value as string, currentPage.value, limitItemsPage.value, "", "")
            // console.log(results.value)
            // if (results.value) {
            //     totalPages.value = Math.ceil(results.value.data.length / limitItemsPage.value)
            //     console.log("results.value.data.length", results.value.data.length)
            //     console.log("limitItemsPage.value", limitItemsPage.value)
            //     console.log("totalPages.value", totalPages.value)
            // }
            // rows.value = results.value?.data as SubProblemAdmin[]

        }

        if (mode.value === 'update') {
            const updated = await solutionAdapter.update()
            console.log('Updated :', updated)
            //Mise a jour en db
            const idSubProblem = (updated as SubProblemFormModel).id_sub_disease as string
            const subProblemAdmin: UpdateSubProblemAdmin = {
                sub_disease_name_FR: (updated as SubProblemFormModel).sub_disease_name_FR as string,
                status_sub_disease: (updated as SubProblemFormModel).status_sub_disease === "true",

            }
            const updateSubProblem = await solutionService?.updateSubProblem("admin", idSubProblem, subProblemAdmin)
            console.log("updateProblem", updateSubProblem)
            rows.value?.map((subProblem) => {
                if (idSubProblem == subProblem.id_sub_disease) {
                    subProblem.sub_disease_name_FR = updateSubProblem?.sub_disease_name_FR
                    subProblem.status_sub_disease = updateSubProblem?.status_sub_disease
                }
            })
            console.log("rows", rows.value)
        }
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
