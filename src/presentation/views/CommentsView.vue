<template>
  <div class="comments-view-container">
    <div class="flex justify-between items-center mb-6">
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Chargement des commentaires...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p class="text-red-500">Erreur : {{ error }}</p>
    </div>

    <div v-else class="table-container">
      <Table
        :data="comments"
        :columns="columns"
        :is-authorized="true"
        title-key="id_comment"
        :action-label="getActionLabel"
        @edit="handleTableEdit"
        @delete="handleTableDelete"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { inject } from 'vue';
import { ChatbubbleOutline } from '@vicons/ionicons5';
import Table from '@/presentation/components/Table/TableContainer.vue';
import type { ColumnDefinition } from '@/presentation/components/Table/TableTypes';
import type Comment from "@/domain/entities/Comment";
import { CommentService } from '@/domain/services/CommentService';

const route = useRoute();
const commentService = inject<CommentService>("CommentService");

// Récupérer l'ID de la solution depuis la route
const rawId = route.params.solutionId;
const solutionId = Array.isArray(rawId) ? parseInt(rawId[0]!) : parseInt(rawId as string);

// État pour les commentaires, le chargement et les erreurs
const comments = ref<Comment[]>([]);
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

// Fonction pour formater la date
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

// Récupérer les commentaires depuis le service
const fetchComments = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await commentService!.getCommentBySolutionId(solutionId, 'ASC', 'FR');
    comments.value = response.comments; // Assure-toi que `response` contient bien un tableau `comments`
  } catch (err) {
    error.value = "Erreur lors de la récupération des commentaires.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

// Appeler la fonction au montage du composant
onMounted(fetchComments);

// Définir les colonnes du tableau
const columns: ColumnDefinition<Comment>[] = [
  { label: 'Contenu', key: 'content', icon: ChatbubbleOutline },
];

// Fonction pour obtenir le label d'action
const getActionLabel = (row: Comment) => 'Voir les détails';

// Gestion des événements d'édition et de suppression
const handleTableEdit = (row: Comment) => {
  console.log("Éditer le commentaire ID:", row.id_comment);
};

const handleTableDelete = (row: Comment) => {
  console.log("Supprimer le commentaire ID:", row.id_comment);
};
</script>
