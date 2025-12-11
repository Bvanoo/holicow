<template>
    <!-- <ChatBubble /> -->
    <section style="padding: 16px">
        <Transition name="fade-slide" tag="FilterPanel" appear>
            <FilterPanel title="Filtres" @submit="handleSubmitFilter" class="filter">
                <div class="filter__order">
                    <!-- Composant 1 -->
                    <FilterSelectComponent class="filter__order-select" field-name="colonne" :options="optionsFilter">
                    </FilterSelectComponent>
                    <!-- Composant 2 -->
                    <FilterOrderSwitchComponent fieldName="order"></FilterOrderSwitchComponent>
                </div>
            </FilterPanel>

        </Transition>

        <section v-if="userStore.currentProfile?.role === 'Administrator'"
            style="display: flex; justify-content: space-around">
            <n-button type="primary" @click="openCreate"> Créer un problème </n-button>
        </section>

        <GenericFormModal v-model:show="showModal" :title="modalTitle" :adapter="problemAdapter" @submit="handleSubmit">
            <n-form-item label="Nom du problème" path="disease_name_FR">
                <n-input v-model:value="problemAdapter.form.value.disease_name_FR" />
            </n-form-item>
            <n-form-item label="Temps de guérison" path="est_healing_time">
                <n-input v-model:value="problemAdapter.form.value.est_healing_time" />
            </n-form-item>
            <n-form-item label="Status" path="status_disease">
                <n-select v-model:value="problemAdapter.form.value.status_disease" :options="statusOptions" />
            </n-form-item>
        </GenericFormModal>

        {{ filterResult }}
        <TableContainer :columns="columns" :data="(rows as Problem[] | ProblemAdmin[])"
            :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="onActionDefined"
            :titleKey="'diseaseName'" @action="ButtonAction" @edit="openUpdate" @delete="toggleStatus">
        </TableContainer>

        <div class="table-footer">
            <n-pagination v-model:page="currentPage" :page-count="totalPages" simple />
            <slot name="footer"></slot>
        </div>
    </section>
</template>

<script setup lang="ts">

    //#region imports
    import { onMounted, ref, type Ref, inject, watch, type Component, computed, shallowRef } from 'vue'
    import { ProblemService } from '@/domain/services/ProblemService'

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
    import GenericFormModal from '../components/GenericFormModal.vue';
    import { createProblemFormAdapter } from '@/domain/form/problem/ProblemFormAdapter';
    import type Problem from '@/domain/entities/Problem';
    import type ProblemAdmin from '@/domain/entities/ProblemAdmin';
    import type { ProblemFormModel } from '@/domain/form/problem/ProblemFormModel';
    import type UpdateProblemAdmin from '@/domain/entities/UpdateProblemAdmin';
    import type ProblemPayload from '@/domain/entities/ProblemPayload';
    import type ToggleProblem from '@/domain/entities/ToggleProblem';
    //#endregion imports

    const userStore = useUserStore();

    //#region [const] FilterPanel
    const optionsFilter = [
        { label: 'Nom', value: 'diseaseName' },
        { label: 'Alertes', value: 'alerts' },
        { label: 'Commentaires', value: 'comments' },
        { label: 'Alertes/Avatar', value: 'avatarAlerts' }
    ]
    const filterResult = ref<Record<string, unknown>>();
    //#endregion [const] FilterPanel

    //#region [const] modalForm
    const statusOptions = [{
        label: 'Activer',
        value: 'true'
    }, {
        label: 'Désactiver',
        value: 'false'
    }]
    //#endregion [const] modalForm

    //#region [const] tableContainer
    const rows = ref<Problem[] | ProblemAdmin[]>([])
    const columns: Ref<{ key: string; label: string, icon: Component }[]> = ref([])//est défini dans le onMounted
    //#endregion [const] tableContainer

    //#region [const] pagination
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);
    const limitItemsPage = ref<number>(3);
    //#endregion [const] pagination

    //#region [const] modalForm
    const problemAdapter = createProblemFormAdapter()
    const showModal = ref(false)
    const mode = ref<'create' | 'update'>('create')
    const modalTitle = computed(() =>
        mode.value === 'create' ? 'Créer un problème' : 'Modifier le problème',
    )
    //#endregion [const] modalForm

    //#region [const] service
    const problemService = inject<ProblemService>("problemService");
    const results = ref<ProblemPayload | void>();
    //#endregion [const] service

    onMounted(async () => {
        if (userStore?.currentProfile?.role === "Administrator") {
            columns.value = [
                { key: 'disease_name_FR', label: 'Nom', icon: shallowRef(ProblemIcon) },
                { key: 'status_disease', label: 'Status', icon: shallowRef(AlertAvatarIcon) },
                { key: 'actions', label: 'Actions', icon: shallowRef(AlertAvatarIcon) },
            ]
            results.value = await problemService?.getAllProblemsAdmin(currentPage.value, limitItemsPage.value, "", "")
            totalPages.value = Number(results.value?.totalPages)
            console.log("limitItems.value", limitItemsPage.value);
            rows.value = results.value!.data as ProblemAdmin[]
        }
        else {
            columns.value = [
                { key: 'diseaseName', label: 'Nom', icon: shallowRef(ProblemIcon) },
                { key: 'commentCount', label: 'Commentaires', icon: shallowRef(CommentIcon) },
                { key: 'farmerAlertCount', label: 'Alertes', icon: shallowRef(AlertsIcon) },
                { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: shallowRef(AlertAvatarIcon) },
                { key: 'actions', label: 'Actions', icon: shallowRef(AlertAvatarIcon) },
            ]
            results.value = await problemService?.getAllProblems(userStore.currentUserId as string, currentPage.value, limitItemsPage.value, "", "")
            totalPages.value = Number(results.value?.totalPages)
            rows.value = results.value!.diseases
        }
    })

    //Observation du changement de page
    watch(currentPage, async () => {
        console.log("limitItems.value", limitItemsPage.value);

        //Les objets que nous renvoit l'api ne sont pas les mêmes en fonction de l'admin ou du farmer
        if (userStore?.currentProfile?.role === "Administrator") {
            results.value = await problemService?.getAllProblemsAdmin(currentPage.value, limitItemsPage.value, "", "")
            totalPages.value = Number(results.value?.totalPages)
            rows.value = results.value!.data as ProblemAdmin[]
        }
        else {
            results.value = await problemService?.getAllProblems(userStore.currentUserId as string, currentPage.value, limitItemsPage.value, "", "")
            totalPages.value = Number(results.value?.totalPages)
            rows.value = results.value!.diseases
        }
    })

    //#region [functions] tableContainer
    function ButtonAction(row: Problem | ProblemAdmin) {
        //Les objets que nous renvoit l'api ne sont pas les mêmes en fonction de l'admin ou du farmer
        if (userStore.currentProfile?.role === "Administrator") {
            if (row.SubDiseaseExisting) {
                router.push({
                    name: 'sub problems',
                    params: { data: (row as ProblemAdmin).id_disease + "_" + (row as ProblemAdmin).disease_name_FR }
                });
            } else {
                userStore.isProblemViewAction = true;
                router.push({
                    name: 'solutionsList',
                    params: { data: (row as ProblemAdmin).id_disease + "_" + (row as ProblemAdmin).disease_name_FR }
                });
                //vers solution
            }
        } else {
            if (row.SubDiseaseExisting) {
                console.log(row.diseaseId)
                router.push({
                    name: 'sub problems',
                    params: { data: (row as Problem).diseaseId + "_" + (row as Problem).diseaseName }
                });
            } else {
                userStore.isProblemViewAction = true;
                router.push({
                    name: 'solutionsList',
                    params: { data: (row as Problem).diseaseId + "_" + (row as Problem).diseaseName }
                });
                //vers solution
            }
        }
    }

    function onActionDefined(row: Problem) {
        if (row.SubDiseaseExisting) {
            return 'voir les sous-problèmes'
        } else {
            return 'voir les solutions'
        }
    }
    const openUpdate = (row: ProblemAdmin | Problem) => {
        mode.value = 'update'
        console.log(row);

        const problemAdminFormModel: ProblemFormModel = {
            id_disease: (row as ProblemAdmin).id_disease.toString(),
            disease_name_FR: (row as ProblemAdmin).disease_name_FR as string,
            est_healing_time: (row as ProblemAdmin).est_healing_time.toString(),
            status_disease: (row as ProblemAdmin).status_disease.toString()
        }

        problemAdapter.load(problemAdminFormModel)

        showModal.value = true
    }
    const toggleStatus = async (row: ProblemAdmin | Problem) => {
        //Appeler le service pour toggle
        const results = await problemService?.toggleProblemStatus("admin", row.id_disease as string) as ToggleProblem

        rows.value.map(async (problem) => {
            if ((problem as ProblemAdmin).id_disease == results?.disease?.id_disease)
                (problem as ProblemAdmin).status_disease = results?.disease.status_disease as boolean
        })
    }
    //#endregion [functions] tableContainer

    //#region [functions] filterPanel
    function handleSubmitFilter(payload: Record<string, unknown>) {
        filterResult.value = payload
        console.log(payload)
    }
    //#endregion [functions] filterPanel

    //#region [functions] genericModalForm and add button
    const openCreate = () => {
        mode.value = 'create'

        problemAdapter.reset()
        showModal.value = true
    }

    async function handleSubmit() {
        if (mode.value === 'create') {
            const created = await problemAdapter.create()
            console.log('Created :', created)
        }

        if (mode.value === 'update') {
            const updated = await problemAdapter.update()
            console.log('Updated :', updated)
            //Mise a jour en db
            const idProblem = (updated as ProblemFormModel).id_disease as string
            const problemAdmin: UpdateProblemAdmin = {
                disease_name_FR: (updated as ProblemFormModel).disease_name_FR as string,
                est_healing_time: Number((updated as ProblemFormModel).est_healing_time),
                status_disease: (updated as ProblemFormModel).status_disease.toString() === 'true',

            }
            const updateProblem = await problemService?.updateProblem("admin", idProblem, problemAdmin)
            console.log("updateProblem", updateProblem)
            rows.value?.map((problem) => {
                if (idProblem == problem.id_disease) {
                    problem.disease_name_FR = updateProblem?.disease_name_FR
                    problem.est_healing_time = updateProblem?.est_healing_time
                    problem.status_disease = updateProblem?.status_disease
                }
            })
            console.log("rows", rows.value)
        }
    }

    //#endregion [functions] genericModalForm and add button
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
