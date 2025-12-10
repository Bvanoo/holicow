<template>
    <!-- <ChatBubble /> -->
    <section style="padding: 16px">
        <h1>{{ problemName }}</h1>

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
        <section v-if="userStore.currentProfile?.role === 'Administrator'"
            style="display: flex; justify-content: space-around">
            <n-button type="primary" @click="openCreate"> Créer un sous-problème </n-button>
        </section>

        <GenericFormModal v-model:show="showModal" :title="modalTitle" :adapter="subProblemAdapter"
            @submit="handleSubmit">

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

        <TableContainer :columns="columns" :data="(rows as SubProblem[] | SubProblemAdmin[])"
            :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="onActionDefined"
            :titleKey="'subDiseaseName'" @action="ButtonAction" @edit="openUpdate">
        </TableContainer>

        <!-- <ProblemTable :columns="columns" :data="rows" primary-key="disease_name_FR"> -->
        <!-- <template #footer>
        <n-button type="primary">Action footer</n-button>
      </template> -->
        <!-- </ProblemTable> -->
        <div class="table-footer">
            <n-pagination v-model:page="currentPage" :page-count="totalPages" simple />
            <slot name="footer"></slot>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { onMounted, ref, type Ref, inject, watch, type Component, computed } from 'vue';
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

    const statusOptions = [{
        label: 'Activer',
        value: 'true'
    }, {
        label: 'Désactiver',
        value: 'false'
    }]

    const userStore = useUserStore();

    const results = ref<SubProblemPayload | SubProblemAdmin[] | void>();

    const currentPage = ref<number>(1)
    const limitItemsPage = ref<number>(3)
    const rows = ref<SubProblem[] | SubProblemAdmin[] | void>()
    const totalPages = ref<number>(1);

    const columns: Ref<{ key: string; label: string, icon: Component }[]> = ref([])
    const subProblemService = inject<SubProblemService>("subProblemService");
    const route = useRoute();
    //1_Grippe%20aviaireeeeeé
    const splittedParams = (route.params.data as string).split("_")
    const idProblem = ref(splittedParams[0])
    const problemName = ref(splittedParams[1])

    onMounted(async () => {
        if (userStore?.currentProfile?.role === "Administrator") {
            columns.value = [
                { key: 'sub_disease_name_FR', label: 'Nom', icon: ProblemIcon },
                { key: 'status_sub_disease', label: 'Status', icon: AlertAvatarIcon },
                { key: 'actions', label: 'Actions', icon: AlertAvatarIcon },
            ]
            results.value = await subProblemService?.getSubProblemByProblemIdAdmin(idProblem.value as string/*, currentPage.value, limitItemPage.value, "", ""*/)

            //‼️‼️A changer quand la pagination est faites sur le endpoints "/subDisease" (pas "/subDisease/:idDisease")
            //Par défaut je met tout sur une page
            totalPages.value = 1

            rows.value = results.value as SubProblemAdmin[]
        }
        else {
            columns.value = [
                { key: 'subDiseaseName', label: 'Nom', icon: ProblemIcon },
                { key: 'commentCount', label: 'Commentaires', icon: CommentIcon },
                { key: 'farmerAlertCount', label: 'Alertes', icon: AlertsIcon },
                { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: AlertAvatarIcon },
                { key: 'actions', label: 'Actions', icon: AlertAvatarIcon },
            ]
            results.value = await subProblemService?.getSubProblemByProblemId(userStore.currentProfile?.profilId as string, idProblem.value as string, currentPage.value, limitItemsPage.value, "", "")
            totalPages.value = Number(results.value?.totalPages)
            rows.value = results.value?.subDiseases as SubProblem[]
        }

    })

    watch(currentPage, async () => {
        if (userStore?.currentProfile?.role === "Administrator") {
            results.value = await subProblemService?.getSubProblemByProblemIdAdmin(idProblem.value as string/*, currentPage.value, limitItemPage.value, "", ""*/)

            rows.value = results.value as SubProblemAdmin[]
        }
        else {
            results.value = await subProblemService?.getSubProblemByProblemId(userStore.currentProfile?.profilId as string, idProblem.value as string, currentPage.value, limitItemsPage.value, "", "")
            totalPages.value = Number(results.value?.totalPages)
            rows.value = results.value?.subDiseases as SubProblem[]
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
                params: { data: (row as SubProblem).subDiseaseId }
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
            sub_disease_name_FR: (row as SubProblemAdmin).sub_disease_name_FR as string,
            status_sub_disease: (row as SubProblemAdmin).status_sub_disease.toString()
        }

        subProblemAdapter.load(subProblemAdminFormModel)

        showModal.value = true
    }
    const modalTitle = computed(() =>
        mode.value === 'create' ? 'Créer un sous-problème' : 'Modifier le sous-problème',
    )
    async function handleSubmit() {
        if (mode.value === 'create') {
            const created = await subProblemAdapter.create()
            console.log('Created :', created)
            results.value = await subProblemService?.getSubProblemByProblemIdAdmin(idProblem.value as string/*, currentPage.value, pageSize.value, "", ""*/)
            rows.value = results.value as SubProblemAdmin[]

        }

        if (mode.value === 'update') {
            const updated = await subProblemAdapter.update()
            console.log('Updated :', updated)
            //Mise a jour en db
            const idSubProblem = (updated as SubProblemFormModel).id_sub_disease as string
            const subProblemAdmin: UpdateSubProblemAdmin = {
                sub_disease_name_FR: (updated as SubProblemFormModel).sub_disease_name_FR as string,
                status_sub_disease: (updated as SubProblemFormModel).status_sub_disease === "true",

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
