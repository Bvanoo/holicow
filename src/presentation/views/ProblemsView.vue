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
        <!-- Changer le true par true si le role user est admin -->
        <TableContainer :columns="columns" :data="rows as Problem[]"
            :isAuthorized="userStore.currentProfile?.role === 'Administrator'">
        </TableContainer>

        <!-- <ProblemTable :columns="columns" :data="rows" primary-key="disease_name_FR"> -->
        <!-- <template #footer>
        <n-button type="primary">Action footer</n-button>
      </template> -->
        <!-- </ProblemTable> -->
        <div class="table-footer">
            <n-pagination v-model:page="currentPage" :page-size="pageSize" :item-count="totalItems" simple />
            <slot name="footer"></slot>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { onMounted, ref, type Ref, inject, watch, type Component } from 'vue'
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

    const userStore = useUserStore();

    const results = ref<ProblemPayload | void>();

    const currentPage = ref<number>(1)
    const pageSize = ref<number>(3)
    const rows = ref<Problem[]>()
    const totalItems = ref<number>();

    const columns: Ref<{ key: string; label: string, icon: Component }[]> = ref([])
    const problemService = inject<ProblemService>("problemService");

    columns.value = [
        { key: 'diseaseName', label: 'Nom', icon: ProblemIcon },
        { key: 'commentCount', label: 'Commentaires', icon: CommentIcon },
        { key: 'farmerAlertCount', label: 'Alertes', icon: AlertsIcon },
        { key: 'similarAvatarAlertCount', label: 'Alertes/Avatar', icon: AlertAvatarIcon },
    ]
    onMounted(async () => {
        results.value = await problemService?.getAllProblems(userStore.currentUserId as string, currentPage.value, pageSize.value, "", "")
        console.log(results)
        rows.value = results.value!.diseases
        //A modifier dès que l'api est mise à jour (pagination)
        // if (results.value!.total) {
        //     pageSize.value = Math.ceil(results.value!.total / results.value!.totalPages)

        //     console.log("results.value!.total", results.value!.total);
        //     console.log("results.value!.totalPages", results.value!.totalPages);
        //     console.log(" p,ageSize.value", pageSize.value);

        //     totalItems.value = results.value!.total;
        // }
    })

    watch(currentPage, async () => {
        // if (sortKey.value) sortOrder.value = 'asc'
        results.value = await problemService?.getAllProblems(userStore.currentUserId as string, currentPage.value, pageSize.value, "", "")
        rows.value = results.value!.diseases;
    })

    const filterResult = ref<Record<string, unknown>>();

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
