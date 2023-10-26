<template>
  <view class="column gap-24" v-for="item in count" :key="'banner-' + item">
    <rect :className="['wp-100', 'h-288']"></rect>
  </view>
</template>

<script lang="ts" setup>
  import rect from './rect.vue'
  defineProps({
    count: Number,
  })
</script>
