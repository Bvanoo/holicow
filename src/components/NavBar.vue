<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'
    import router from '@/router'
    import { NAvatar, NDrawer, NButton } from 'naive-ui'

    interface Tab {
        key: string
        label: string
    }

    const props = defineProps<{
        logoSrc?: string
        logoSrcUE?: string
        profileSrc?: string
        modelValue?: string
    }>()

    const emit = defineEmits(['update:active'])

    const tabs: Tab[] = [
        { key: '', label: 'Home' },
        { key: 'maladies', label: 'Maladies' },
        { key: 'commentaires', label: 'Commentaires' },
        { key: 'alertes', label: 'Alertes' },
        { key: 'profile', label: 'Profile' },
    ]

    const active = computed(() => props.modelValue ?? 'maladies')

    const showDrawer = ref(false)
    const mobile = ref(false)

    const logoSrc = props.logoSrc ?? ''
    const logoSrcUE = props.logoSrcUE ?? ''
    const profileSrc = props.profileSrc ?? ''

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
        emit('update:active', key)
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
                <img v-if="logoSrcUE" :src="logoSrcUE" alt="logo" class="logo UE" />
                <slot name="logo" v-else>
                    <div class="logo-placeholder">LOGO</div>
                </slot>
            </div>

            <div class="center" v-if="!mobile">
                <button v-for="item in tabs" :key="item.key" :class="['tab', { active: item.key === active }]"
                    @click="$emit('update:active', item.key)">
                    {{ item.label }}
                </button>
            </div>

            <div class="right">
                <n-button class="menu-button" v-if="mobile" @click="showDrawer = true" type="primary" ghost>
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" />
                    </svg>
                </n-button>

                <div class="profile" @click="$emit('update:active', 'profile')">
                    <div class="stars-wrap" aria-hidden>
                        <!-- inline svg of stars circling the avatar -->
                        <svg viewBox="0 0 100 100" class="stars-svg">
                            <g transform="translate(50,50)">
                                <g v-for="i in 8" :key="i" :transform="`rotate(${(i - 1) * 45}) translate(32,0)`">
                                    <polygon
                                        points="0,-3 0.9,-1 3,-1 1.2,0.4 1.9,2.6 0,1.1 -1.9,2.6 -1.2,0.4 -3,-1 -0.9,-1" />
                                </g>
                            </g>
                        </svg>
                    </div>

                    <n-avatar :src="profileSrc" :size="56" round />
                </div>
            </div>
        </div>

        <n-drawer v-model:show="showDrawer" placement="left" size="70%">
            <div class="drawer-content">
                <button v-for="item in tabs" :key="item.key + '-drawer'"
                    :class="['drawer-item', { active: item.key === active }]" @click="onSelect(item.key)">
                    {{ item.label }}
                </button>
            </div>
        </n-drawer>
    </nav>

</template>