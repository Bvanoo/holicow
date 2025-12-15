<template>
    <!-- <ChatBubble /> -->
    <section class="view">
        <h1>{{ problemName }}</h1>
        <div class="view__header">

            <Transition name="fade-slide" tag="FilterPanel" appear>

                <TransitionGroup name="fade-slide" tag="FilterPanel" appear>
                    <FilterPanel title="Filtres" @submit="handleSubmitFilter" class="filter">
                        <!-- Composant 1 -->
                        <FilterSelectComponent class="filter__order-select" field-name="colonne"
                            :options="optionsFilter">
                        </FilterSelectComponent>
                        <!-- Composant 2 -->
                        <FilterOrderSwitchComponent fieldName="order"></FilterOrderSwitchComponent>
                    </FilterPanel>
                </TransitionGroup>
            </Transition>
            <section v-if="userStore.currentProfile?.role === 'Administrator'" class="view__header__button">
                <n-button class="view__header__buttonProbleme" tertiary type="primary" color="white" size="large"
                    @click="openCreate">
                    Créer un sous-problème
                </n-button>
                <n-button v-if="!((rows as SubProblem[] | SubProblemAdmin[]).length > 0)"
                    class="view__header__buttonProbleme" tertiary type="primary" color="white" size="large"
                    @click="goToSolutions">
                    Aller vers les solutions
                </n-button>
            </section>
        </div>
        {{ filterResult }}
        <section class="view__content">
            <TableContainer :columns="columns" :data="(rows as SubProblem[] | SubProblemAdmin[])"
                :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="onActionDefined"
                :titleKey="'subDiseaseName'" @action="ButtonAction" @edit="openUpdate" @delete="toggleStatus">
            </TableContainer>
        </section>
        <!-- <ProblemTable :columns="columns" :data="rows" primary-key="disease_name_FR"> -->
        <!-- <template #footer>
        <n-button type="primary">Action footer</n-button>
      </template> -->
        <!-- </ProblemTable> -->
        <section class="view__footer">
            <n-pagination v-model:page="currentPage" :page-count="totalPages" simple />
            <slot name="footer"></slot>
        </section>
    </section>

    <GenericFormModal v-model:show="showModal" :title="modalTitle" :adapter="subProblemAdapter" @submit="handleSubmit">

        <n-form-item label="Nom du problème">
            <n-input :disabled="true" v-model:value="problemName" />
        </n-form-item>
        <n-form-item label="Nom du sous-problème" path="sub_disease_name_FR">
            <n-input v-model:value="subProblemAdapter.form.value.sub_disease_name_FR" />
        </n-form-item>
        <n-form-item label="Status" path="status_sub_disease">
            <n-select v-model:value="subProblemAdapter.form.value.status_sub_disease" :options="statusOptions" />
        </n-form-item>
    </GenericFormModal>
</template>

<script setup lang="ts">

    import { onMounted, ref, type Ref, inject, watch, type Component, computed, shallowRef } from 'vue';
    import { SubProblemService } from '../../domain/services/SubProblemService';
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
    import type SubProblemAdmin from '@/domain/entities/SubProblemAdmin';
    import { createSubProblemFormAdapter } from '@/domain/form/subProblem/SubProblemFormAdapter';
    import GenericFormModal from '../components/GenericFormModal.vue';
    import type { SubProblemFormModel } from '@/domain/form/subProblem/SubProblemFormModel';
    import type UpdateSubProblemAdmin from '@/domain/entities/UpdateSubProblemAdmin';
    import type SubProblemPayload from '@/domain/entities/SubProblemPayload';
    import type ToggleSubProblem from '@/domain/entities/ToggleSubProblem';
    import type SubProblemPayloadAdmin from '@/domain/entities/SubProblemPayloadAdmin';

    //#region [const] FilterPanel
    const optionsFilter = [
        { label: 'Nom', value: 'diseaseName' },
        { label: 'Alertes', value: 'alerts' },
        { label: 'Commentaires', value: 'comments' },
        { label: 'Alertes/Avatar', value: 'avatarAlerts' },
    ]
    //#endregion [const] FilterPanel
    const statusOptions = [{
        label: 'Activer',
        value: 'true'
    }, {
        label: 'Désactiver',
        value: 'false'
    }]

    const userStore = useUserStore();

    const results = ref<SubProblemPayload | SubProblemPayloadAdmin | void>();

    const currentPage = ref<number>(1)
    const limitItemsPage = ref<number>(3)
    const rows = ref<SubProblem[] | SubProblemAdmin[] | void>([])
    const totalPages = ref<number>(1);

    const columns: Ref<{ key: string; label: string, icon: Component }[]> = ref([])
    const subProblemService = inject<SubProblemService>("subProblemService");
    const route = useRoute();
    //1_Grippe%20aviaireeeeeé
    console.log(route.params.data)
    const idProblem = ref<string>()
    const problemName = ref<string>()
    if (route.params.data) {
        idProblem.value = route.params.data[0]
        problemName.value = route.params.data[1]
    }

    onMounted(async () => {
        if (userStore?.currentProfile?.role === "Administrator") {
            columns.value = [
                { key: 'sub_disease_name_FR', label: 'Nom', icon: shallowRef(ProblemIcon) },
                { key: 'status_sub_disease', label: 'Status', icon: shallowRef(AlertAvatarIcon) },
                { key: 'actions', label: 'Actions', icon: shallowRef(AlertAvatarIcon) },
            ]
            results.value = await subProblemService?.getSubProblemByProblemIdAdmin(idProblem.value as string, currentPage.value, limitItemsPage.value, "", "")
            console.log("getAllSubProblem Admin : ", results.value)
            //‼️‼️A changer quand la pagination est faites sur le endpoints "/subDisease" (pas "/subDisease/:idDisease")
            //Par défaut je met tout sur une page
            totalPages.value = Number(results.value?.meta.totalPages)

            rows.value = results.value?.data as SubProblemAdmin[]
        }
        else {
            columns.value = [
                { key: 'subDiseaseName', label: 'Nom', icon: shallowRef(ProblemIcon) },
                { key: 'commentCount', label: 'Commentaires', icon: shallowRef(CommentIcon) },
                { key: 'farmerAlertCount', label: 'Alertes', icon: shallowRef(AlertsIcon) },
                { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: shallowRef(AlertAvatarIcon) },
                { key: 'actions', label: 'Actions', icon: shallowRef(AlertAvatarIcon) },
            ]
            results.value = await subProblemService?.getSubProblemByProblemId(userStore.currentProfile?.profilId as string, idProblem.value as string, currentPage.value, limitItemsPage.value, "", "")
            totalPages.value = Number(results.value?.totalPages)
            rows.value = results.value?.subDiseases as SubProblem[]
        }

    })

    watch(currentPage, async () => {
        if (userStore?.currentProfile?.role === "Administrator") {
            results.value = await subProblemService?.getSubProblemByProblemIdAdmin(idProblem.value as string, currentPage.value, limitItemsPage.value, "", "")
            totalPages.value = Number(results.value?.meta.totalPages)
            rows.value = results.value?.data as SubProblemAdmin[]
        }
        else {
            results.value = await subProblemService?.getSubProblemByProblemId(userStore.currentProfile?.profilId as string, idProblem.value as string, currentPage.value, limitItemsPage.value, "", "")
            totalPages.value = Number(results.value?.totalPages)
            rows.value = results.value?.subDiseases as SubProblem[]
        }
    })

    const filterResult = ref<Record<string, unknown>>();

    function ButtonAction(row: SubProblem | SubProblemAdmin) {
        console.log("row", row)
        userStore.isProblemViewAction = false;
        if (userStore?.currentProfile?.role === "Administrator") {
            router.push({
                name: 'solutionsList',
                // params: { data: (row as SubProblemAdmin).id_sub_disease + '_' + (row as SubProblemAdmin).sub_disease_name_FR }
                params: {
                    data: [idProblem.value as string, (row as SubProblemAdmin).id_sub_disease, problemName.value as string]
                }
            });
        }
        else {
            router.push({
                name: 'solutionsList',
                params: { data: [idProblem.value as string, (row as SubProblem).subDiseaseId?.toString() as string, problemName.value as string] }
            });
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function onActionDefined(row: SubProblem) {
        return 'Voir les solutions'
    }
    const subProblemAdapter = createSubProblemFormAdapter()

    const showModal = ref(false)
    const mode = ref<'create' | 'update'>('create')
    function handleSubmitFilter(payload: Record<string, unknown>) {
        filterResult.value = payload
        console.log(payload)
    }

    const goToSolutions = () => {
        userStore.isProblemViewAction = true;
        router.push({
            name: 'solutionsList',
            // params: { data: (row as SubProblemAdmin).id_sub_disease + '_' + (row as SubProblemAdmin).sub_disease_name_FR }
            params: {
                data: [idProblem.value as string, "0", problemName.value as string]
            }
        });
    }

    const openCreate = () => {
        mode.value = 'create'

        subProblemAdapter.reset()
        subProblemAdapter.form.value.id_disease = idProblem.value
        showModal.value = true
    }

    const openUpdate = (row: SubProblem | SubProblemAdmin) => {
        mode.value = 'update'
        console.log(row);

        const subProblemAdminFormModel: SubProblemFormModel = {

            id_sub_disease: (row as SubProblemAdmin).id_sub_disease.toString(),
            id_disease: idProblem.value,
            sub_disease_name_FR: (row as SubProblemAdmin).sub_disease_name_FR as string,
            status_sub_disease: (row as SubProblemAdmin).status_sub_disease.toString()
        }

        subProblemAdapter.load(subProblemAdminFormModel)

        showModal.value = true
    }

    const toggleStatus = async (row: SubProblemAdmin | SubProblem) => {
        //Appeler le service pour toggle
        const results = await subProblemService?.toggleSubProblemStatus("admin", row.id_sub_disease as string) as ToggleSubProblem
        if (rows.value)
            rows.value.map(async (problem) => {
                console.log("results", results)
                if ((problem as SubProblemAdmin).id_sub_disease == results?.subDisease?.id_sub_disease)
                    (problem as SubProblemAdmin).status_sub_disease = results?.subDisease?.status_sub_disease as boolean
            })
    }

    const modalTitle = computed(() =>
        mode.value === 'create' ? 'Créer un sous-problème' : 'Modifier le sous-problème',
    )
    async function handleSubmit() {
        if (mode.value === 'create') {
            const created = await subProblemAdapter.create()
            console.log('Created :', created)
            results.value = await subProblemService?.getSubProblemByProblemIdAdmin(idProblem.value as string, currentPage.value, limitItemsPage.value, "", "")
            console.log(results.value)
            totalPages.value = Number(results.value?.meta.totalPages)
            rows.value = results.value?.data as SubProblemAdmin[]

        }

        if (mode.value === 'update') {
            const updated = await subProblemAdapter.update()
            console.log('Updated :', updated)
            //Mise a jour en db
            const idSubProblem = (updated as SubProblemFormModel).id_sub_disease as string
            const subProblemAdmin: UpdateSubProblemAdmin = {
                sub_disease_name_FR: (updated as SubProblemFormModel).sub_disease_name_FR as string,
                status_sub_disease: (updated as SubProblemFormModel).status_sub_disease === "true",
                id_disease: Number((updated as SubProblemFormModel).id_disease)
            }
            const updateSubProblem = await subProblemService?.updateSubProblem("admin", idSubProblem, subProblemAdmin)
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

    h1 {
        color: white;
    }
</style>
