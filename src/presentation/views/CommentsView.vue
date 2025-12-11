
<template>
    <div class="text-3xl font-bold underline">CommentsView</div>
</template>

<script lang="ts" setup>
  import {CommentStore} from  '@/stores/CommentStore.ts'
  import {storeToRefs} from "pinia";
  import {useRoute} from "vue-router";

  const route = useRoute();
  const commentStore =  CommentStore()
  const {
    comments,
    isLoading,
    approvedComments
  } = storeToRefs(commentStore);

  const rawSolution = route.params.solutionId;
  /*commentStore.fetchCommentsBySolutionId(solutionId ,  {page  : pageValue, limit : string, sortedBy : string, sortedOrder : string})*/
</script>
