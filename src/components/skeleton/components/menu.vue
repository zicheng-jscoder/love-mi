<template>
  <view class="grid-4 gap-24">
    <view
      class="item row justify-center"
      v-for="item in count"
      :key="'grid' + item"
    >
      <rect :className="['rect-144']"></rect>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import rect from './rect.vue'
  defineProps({
    count: Number,
  })
</script>

<style lang="scss" scoped></style>
