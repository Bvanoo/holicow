<template>
    <!-- <ChatBubble /> -->
    <section style="padding: 16px">
        <Transition name="fade-slide" tag="FilterPanel" appear>
            <FilterPanel title="Filtres" @submit="handleSubmitFilter" class="filter">
                <div class="filter__order">
                    <!-- Composant 1 -->
                    <FilterSelectComponent class="filter__order-select" field-name="colonne" :options="[
                        { label: 'Nom', value: 'diseaseName' },
                        { label: 'Alertes', value: 'alerts' },
                        { label: 'Commentaires', value: 'comments' },
                        { label: 'Alertes/Avatar', value: 'avatarAlerts' }
                    ]"></FilterSelectComponent>
                    <!-- Composant 2 -->
                    <FilterOrderSwitchComponent fieldName="order"></FilterOrderSwitchComponent>
                </div>
                <!-- Ajouter un v-if et regarder si l'utilisateur est un "Administator" -->
                <!-- <div class="filter__search">
                <span>Rechercher :</span> 
            Composant 3
            <FilterInputComponent fieldName="test"></FilterInputComponent>
            </div> -->
            </FilterPanel>

        </Transition>

        <section v-if="userStore.currentProfile?.role === 'Administrator'"
            style="display: flex; justify-content: space-around">
            <n-button type="primary" @click="openCreate"> Créer un problème </n-button>
        </section>

        <GenericFormModal v-model:show="showModal" :title="modalTitle" :adapter="problemAdapter" @submit="handleSubmit">
            <n-form-item label="Nom du problème" path="name">
                <n-input v-model:value="problemAdapter.form.value.disease_name_FR" />
            </n-form-item>
            <n-form-item label="Description" path="description">
                <n-input v-model:value="problemAdapter.form.value.est_healing_time" />
            </n-form-item>
        </GenericFormModal>

        {{ filterResult }}
        <TableContainer :columns="columns" :data="(rows as Problem[])"
            :isAuthorized="userStore.currentProfile?.role === 'Administrator'" :actionLabel="onActionDefined"
            :titleKey="'diseaseName'" @action="ButtonAction" @edit="openUpdate">
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

    import { onMounted, ref, type Ref, inject, watch, type Component, computed } from 'vue'
    import { ProblemService } from '@/domain/services/ProblemService'
    import type ProblemPayload from '@/domain/entities/ProblemPayload';
    import type Problem from '@/domain/entities/Problem';
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
    import type ProblemAdmin from '@/domain/entities/ProblemAdmin';

    const userStore = useUserStore();

    const results = ref<ProblemPayload | void>();

    const currentPage = ref<number>(1)
    const pageCount = ref<number>(0)
    const totalPages = ref<number>(3)
    const rows = ref<Problem[] | ProblemAdmin[]>()
    const totalItems = ref<number>();

    const columns: Ref<{ key: string; label: string, icon: Component }[]> = ref([])
    const problemService = inject<ProblemService>("problemService");

    onMounted(async () => {
        //‼️‼️Quand on est à la page 2 et qu'on retourne à la page 1, on a un 4e problème (alors que la limite est à 3)‼️‼️
        if (userStore?.currentProfile?.role === "Administrator") {
            columns.value = [
                { key: 'disease_name_FR', label: 'Nom', icon: ProblemIcon },
                { key: 'status_disease', label: 'Status', icon: AlertAvatarIcon },
                { key: 'actions', label: 'Actions', icon: AlertAvatarIcon },
            ]
            results.value = await problemService?.getAllProblemsAdmin(currentPage.value, totalPages.value, "", "")
            rows.value = results.value!.data
        }
        else {
            columns.value = [
                { key: 'diseaseName', label: 'Nom', icon: ProblemIcon },
                { key: 'commentCount', label: 'Commentaires', icon: CommentIcon },
                { key: 'farmerAlertCount', label: 'Alertes', icon: AlertsIcon },
                { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: AlertAvatarIcon },
                { key: 'actions', label: 'Actions', icon: AlertAvatarIcon },
            ]
            results.value = await problemService?.getAllProblems(userStore.currentUserId as string, currentPage.value, totalPages.value, "", "")
            rows.value = results.value!.diseases
        }

        console.log(results)
        // A modifier dès que l'api est mise à jour (pagination)
        totalItems.value = results.value?.totalItems
        totalPages.value = results.value!.totalPages
        if (totalItems.value)
            pageCount.value = Math.ceil(totalItems.value / totalPages.value)
        console.log("results.value!.totalDiseases", results.value!.totalItems);
        console.log("results.value!.totalPages", results.value!.totalPages);
        console.log("pageSize.value", totalPages.value);
        console.log("pageCount.value", pageCount.value);

    })

    watch(currentPage, async () => {

        if (userStore?.currentProfile?.role === "Administrator") {
            results.value = await problemService?.getAllProblemsAdmin(currentPage.value, totalPages.value, "", "")
            rows.value = results.value!.data
        }
        else {
            results.value = await problemService?.getAllProblems(userStore.currentUserId as string, currentPage.value, totalPages.value, "", "")
            rows.value = results.value!.diseases
        }
    })

    const filterResult = ref<Record<string, unknown>>();

    function ButtonAction(row: Problem | ProblemAdmin) {
        if (userStore.currentProfile?.role === "Administrator") {
            if (row.SubDiseaseExisting) {
                console.log(row.diseaseId)
                router.push({
                    name: 'sub problems',
                    params: { data: (row as ProblemAdmin).id_disease }
                });
            } else {
                userStore.isProblemViewAction = true;
                router.push({
                    name: 'solutionsList',
                    params: { data: (row as ProblemAdmin).id_disease }
                });
                //vers solution
            }
        } else {
            if (row.SubDiseaseExisting) {
                console.log(row.diseaseId)
                router.push({
                    name: 'sub problems',
                    params: { data: (row as Problem).diseaseId }
                });
            } else {
                userStore.isProblemViewAction = true;
                router.push({
                    name: 'solutionsList',
                    params: { data: (row as Problem).diseaseId }
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
    //===========================================
    // filter 
    //===========================================
    function handleSubmitFilter(payload: Record<string, unknown>) {
        filterResult.value = payload
        console.log(payload)
    }

    //===========================================
    // modal Form (create, update, delete)
    //===========================================

    // Adapter instance
    const problemAdapter = createProblemFormAdapter()

    const showModal = ref(false)
    const mode = ref<'create' | 'update'>('create')

    // Dynamic Title
    const modalTitle = computed(() =>
        mode.value === 'create' ? 'Créer un problème' : 'Modifier le problème',
    )
    const openCreate = () => {
        mode.value = 'create'

        problemAdapter.reset()
        showModal.value = true
    }

    const openUpdate = () => {
        mode.value = 'update'

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
