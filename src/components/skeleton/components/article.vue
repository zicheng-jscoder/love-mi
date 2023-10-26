<template>
  <view
    class="column gap-24 mt-32"
    v-for="item in count"
    :key="'article-' + item"
  >
    <rect :className="['w-144', 'h-32']"></rect>
    <rect :className="['wp-100', 'h-32']"></rect>
    <rect :className="['wp-100', 'h-32']"></rect>
    <rect :className="['wp-100', 'h-32']"></rect>
    <rect :className="['wp-100', 'h-32']"></rect>
  </view>
</template>

<script lang="ts" setup>
  import rect from './rect.vue'
  defineProps({
    count: Number,
  })
</script>
