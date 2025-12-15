<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="main-container">
    <transition name="fade-slide" tag="div">
      <n-card class="main-container-card" hoverable>
        <div class="main-container-card-header">
          <div class="main-container-card-header-title">
            {{ problemName }} &nbsp; - &nbsp; {{ subproblemName }}
          </div>
          <n-badge :value="alerts" :color="badgeColor" />
        </div>

        <div class="main-container-card-content">
          <div class="main-container-card-content-title">{{ 'Solution : ' }}</div>
          <div class="main-container-card-content-rating">
            {{ 'Cote globale : ' }}
            <div>
              <span v-for="(value, index) in globalNote" :key="index">
                {{ '⭐' }}
              </span>
            </div>
          </div>
          <div class="main-container-card-content-rating">
            {{ 'Ma cote : ' }}
            <div>
              <span v-for="(value, index) in myNote" :key="index">
                {{ '⭐' }}
              </span>
            </div>
          </div>
        </div>

        <div class="main-container-card-content-prevention">
          <p>

            {{ prevention }}
          </p>
        </div>

        <!-- <div class="user-bubble-section">
          <SimpleChatBubble :id="(-1).toString()"
            :avatar-path="userCommentAvatarPath ?? 'https://www.placehold.co/64x64'" :content="userCommentContent"
            :author="userName" :date="userCommentDate" :icon-path="'/pen.svg'" />
        </div> -->
      </n-card>
    </transition>

    <n-empty v-if="comments.length === 0" description="Aucun Commentaire" class="empty-block" />
    <template v-else v-for="(value, index) in comments" :key="index">
    <!-- Insérer des chatBubble avec les noms d'auteur et leurs avatars :date="value.date.toLocaleDateString()" -->
    <SimpleChatBubble :content="value.content"   :icon-path="'/pen.svg'" />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { NCard, NBadge, NEmpty } from 'naive-ui'
  import SimpleChatBubble from './SimpleChatBubble.vue'
  import type Comment from '@/domain/entities/Comment'

  export interface Props {
    problemName?: string
    subproblemName?: string
    myNote?: string | number
    globalNote?: string | number
    prevention?: string
    alerts?: number | string
    problem?: string
    badgeColor?: string
    //relayed props//
    comments?: Comment[]
    userName?: string
    userCommentContent?: string
    userCommentDate?: string
    userCommentAvatarPath?: string
  }

  withDefaults(defineProps<Props>(), {
    comments: () => [],
    problemName: 'ProblemName',
    subproblemName: 'Sub-Problem',
    myNote: 0,
    globalNote: 0,
    badgeColor: '#000000',
    alerts: -1,
    prevention: 'Désinfection avant et après la traite (trempage ou pulvérisation)',
    userName: 'John Doe',
    userCommentDate: new Date().toLocaleDateString(),
  })
</script>

<style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 16px;
  }

  .main-container-card {
    border-radius: 14px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  /* .main-container-card:hover {
  transform: translateY(-4px);
} */

  .main-container-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .main-container-card-header-title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .main-container-card-content {
    display: flex;
    gap: 16px;
    justify-content: space-around;
    align-self: flex-start;
  }

  .main-container-card-content-title {
    font-weight: 700;
  }

  .main-container-card-content-rating {
    display: flex;
    justify-content: space-between;
    gap: 4px;
  }

  .main-container-card-content-prevention {
    display: flex;
    justify-content: center;
  }

  .main-container-card-content-prevention-title {
    font-weight: 700;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-bubble-section {
    display: flex;
  }

  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.35s ease;
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(12px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-12px);
  }

  .pagination-block {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .empty-block {
    margin-top: 20px;
  }

  @media (max-width: 900px) {
    .main-container-card-content-cell {
      display: flex;
      justify-content: space-between;
    }

    .main-container-card-header-title {
      font-size: 1.1rem;
      font-weight: 600;
    }

    .main-container-card-content {
      width: 100%;
      justify-content: space-between;
      gap: 0px;
      flex-direction: column;
    }

    .main-container {
      padding: 0%;
    }
  }
</style>
