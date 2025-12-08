<template>
  <div class="comment-wrapper">
    <n-card
      class="comment-wrapper__comment"
      hoverable
      @click="(e: Event) => console.log('some action')"
    >
      <!-- HEADER -->
      <template #header>
        <section class="comment-wrapper__comment__header">
          <div class="comment-wrapper__comment__user-info">
            <div class="comment-wrapper__comment__user-info__avatar">
              <n-avatar :src="avatarPath" round size="medium" />
              <div>{{ author }}</div>
              <div class="date">{{ date }}</div>
            </div>

            <n-dropdown
              placement="bottom-start"
              trigger="click"
              size="small"
              :options="contentOptions"
              @select="handleSelect"
            >
              <n-button quaternary circle>
                <n-image :src="iconPath ?? '/more-vert.svg'" />
              </n-button>
            </n-dropdown>
          </div>
        </section>
      </template>

      <!-- BODY -->
      <template #default>
        <section class="body">
          <p>{{ content }}</p>
        </section>
      </template>

      <!-- FOOTER -->
      <template #footer>
        <section class="footer"></section>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NAvatar, NCard, NButton, NDropdown, NImage } from 'naive-ui'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'

// Entities
export interface Props {
  id: string
  author?: string
  content?: string
  date?: string
  avatarPath?: string
  contentOptions?: DropdownMixedOption[]
  iconPath: string
}

withDefaults(defineProps<Props>(), {
  date: new Date().toLocaleDateString(),
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium natus deleniti ad nostrum, nesciunt consequuntur totam, est minus accusamus impedit, culpa esse aliquid error minima aut dolor tempora rem molestiae.',
  contentOptions: () => [{ label: 'éditer', key: 'edit' }],
  avatarPath: 'undefined',
})

const emit = defineEmits<{
  (e: 'editChatBubbleContent', newContent: string): void
}>()

// Dropdown test mock
// const options = [
//   {
//     label: 'Jay Gatsby',
//     key: 'jay gatsby',
//   },
//   {
//     label: 'Daisy Buchanan',
//     key: 'daisy buchanan',
//   },
//   {
//     type: 'divider',
//     key: 'd1',
//   },
//   {
//     label: 'Nick Carraway',
//     key: 'nick carraway',
//   },
//   {
//     label: 'Others',
//     key: 'others1',
//     children: [
//       {
//         label: 'Jordan Baker',
//         key: 'jordan baker',
//       },
//       {
//         label: 'Tom Buchanan',
//         key: 'tom buchanan',
//       },
//       {
//         label: 'Others',
//         key: 'others2',
//         children: [
//           {
//             label: 'Chicken',
//             key: 'chicken',
//           },
//           {
//             label: 'Beef',
//             key: 'beef',
//           },
//         ],
//       },
//     ],
//   },
// ]

function handleSelect(key: string) {
  emit('editChatBubbleContent', key)
}
</script>

<style lang="scss" scoped>
.comment-wrapper {
  padding-top: 8px;
  display: flex;
  justify-content: flex-start;

  &__comment {
    // max-width: 600px;
    width: 100%;
    border-radius: 16px;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 14px;
    }

    &__user-info {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      &__avatar {
        display: flex;
        justify-content: left;
        gap: 16px;
        width: 100%;
      }
    }
  }
}
</style>
