<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import router from '@/router'
    import { NAvatar, NDrawer, NButton } from 'naive-ui'
    import { useUserStore } from '@/stores/User'
    import { useRoute } from 'vue-router';

    const userStore = useUserStore();

    interface Tab {
        key: string
        label: string
    }

    const props = defineProps<{
        logoSrc?: string
        profileSrc?: string
        modelValue?: string
    }>()

    const tabs: Tab[] = [
        { key: '', label: 'Home' },
        { key: 'problemes', label: 'Problèmes' },
        { key: 'commentaires', label: 'Commentaires' },
        { key: 'alerts', label: 'Alertes' },
        { key: 'profile', label: 'Profile' },
    ]

    const route = useRoute();

    const showDrawer = ref(false)
    const mobile = ref(false)

    const logoSrc = props.logoSrc ?? ''

    function checkMobile() {
        mobile.value = window.innerWidth <= 768
    }

    onMounted(() => {
        checkMobile()
        window.addEventListener('resize', checkMobile)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', checkMobile)
    })

    function onSelect(key: string) {
        router.push('/' + key)
        showDrawer.value = false
    }

</script>

<template>
    <!--
    <router-link to="/">Home</router-link>
     <router-link to="/maladies">Maladies</router-link>
     <router-link to="/commentaires">Commentaires</router-link>
    <router-link to="/alertes">Alertes</router-link>
    <router-link to="/profil">Profil</router-link> -->

    <nav class="navbar">
        <div class="navbar-inner">
            <div class="left">
                <img v-if="logoSrc" :src="logoSrc" alt="logo" class="logo" />
                <slot name="logo" v-else>
                    <div class="logo-placeholder">LOGO</div>
                </slot>
            </div>

            <div class="center" v-if="!mobile">
                <template v-for="item in tabs" :key="item.key">
                    <button v-if="!(userStore.currentProfile?.role === 'Administrator' && item.label === 'Profile')"
                        class="tab" :class="{ 'active': item.key === route.name }" @click="onSelect(item.key)">
                        {{ item.label }}
                    </button>

                </template>
            </div>

            <div class="right">
                <n-button class="menu-button" v-if="mobile" @click="showDrawer = true" secondary>
                    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" />
                    </svg>
                </n-button>

                <div v-if="!userStore.currentProfile?.role" class="profile" @click="onSelect('profile')">
                    <n-avatar :src="'http://' + userStore.currentProfile?.avatar_picture" :size="56" round
                        color="transparent" />
                </div>
            </div>
        </div>

        <n-drawer v-model:show="showDrawer" placement="left" size="70%">
            <div class="drawer-content">
                <template v-for="item in tabs" :key="item.key + '-drawer'">
                    <button v-if="!(userStore.currentProfile?.role === 'Administrator' && item.label === 'Profile')"
                        :class="['drawer-item', { active: item.key === route.name }]" @click="onSelect(item.key)">
                        {{ item.label }}
                    </button></template>
            </div>
        </n-drawer>
    </nav>

</template>
