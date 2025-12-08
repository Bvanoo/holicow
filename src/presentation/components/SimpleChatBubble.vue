<template>
  <div class="comment-wrapper">
    <n-card class="comment-wrapper__comment">

      <div class="comment-wrapper__comment__header">
        <div class="comment-wrapper__comment__user-info">
          <!-- <n-float-button :right="0" :top="0" shape="square"> </n-float-button> -->
          <div style="display: flex; align-items: center">
            <n-avatar round size="medium" style="margin-right: 16px">A</n-avatar>
            <div class="date">{{ new Date().toLocaleDateString() }}</div>
          </div>
          <!-- <button style="background-color: transparent; color: transparent">
            <img src="/more-vert.svg" />
          </button> -->
          <!-- <n-button round> <img src="/more-vert.svg" /> </n-button> -->
          <n-dropdown placement="bottom-start" trigger="click" size="small" :options="options" @select="handleSelect">
            <n-button> <img src="/more-vert.svg" /> </n-button>
          </n-dropdown>
          <!-- <div class="meta"></div> -->
        </div>
      </div>

      <div class="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

    </n-card>
  </div>
</template>

<script setup lang="ts">
  import { NAvatar, NCard, NIcon, NButton, NDropdown } from 'naive-ui'
  import { useMessage } from 'naive-ui'

  const options = [
    {
      label: 'Jay Gatsby',
      key: 'jay gatsby',
    },
    {
      label: 'Daisy Buchanan',
      key: 'daisy buchanan',
    },
    {
      type: 'divider',
      key: 'd1',
    },
    {
      label: 'Nick Carraway',
      key: 'nick carraway',
    },
    {
      label: 'Others',
      key: 'others1',
      children: [
        {
          label: 'Jordan Baker',
          key: 'jordan baker',
        },
        {
          label: 'Tom Buchanan',
          key: 'tom buchanan',
        },
        {
          label: 'Others',
          key: 'others2',
          children: [
            {
              label: 'Chicken',
              key: 'chicken',
            },
            {
              label: 'Beef',
              key: 'beef',
            },
          ],
        },
      ],
    },
  ]

  const message = useMessage()
  function handleSelect(key: string | number) {
    message.info(String(key))
  }
</script>

<style lang="scss" scoped>
  .comment-wrapper {
    padding-top: 8px;
    display: flex;
    justify-content: flex-start;

    &__comment {
      max-width: 600px;
      width: 100%;
      border-radius: 16px;

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      &__user-info {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  // .header {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   margin-bottom: 12px;
  // }

  // .user-info {
  //   display: flex;
  //   width: 100%;
  //   justify-content: space-between;
  //   align-items: center;
  //   /* gap: 12px; */
  // }

  // .meta {
  //   display: flex;
  //   flex-direction: column;
  // }

  // .name {
  //   font-weight: 600;
  //   font-size: 1rem;
  // }
</style>
