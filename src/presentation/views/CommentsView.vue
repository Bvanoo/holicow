
<template>
    <div class="text-3xl font-bold underline">CommentsView</div>
</template>

<script lang="ts" setup>
  import {CommentStore} from  '@/stores/CommentStore.ts'
  import {storeToRefs} from "pinia";
  import {useRoute} from "vue-router";

  const route = useRoute();
  const commentStore =  CommentStore()
  const { comments, isLoading, approvedComments} = storeToRefs(commentStore);
  const rawSolutionId = route.params.solutionId;
  let solutionId: number | undefined;
  const defaultParams = {
    page: 1,
    limit: 4,
    sortedBy: 'ASC',
    sortedOrder: 'createdAt',
  }


  commentStore.fetchCommentsBySolutionId(1, {page : 1, limit: 4, sortedOrder: "ASC", sortedBy: "dfjhfdsifh"})
</script>
