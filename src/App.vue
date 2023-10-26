<template>
  <view></view>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  onMounted(async () => {})
</script>

<style lang="scss">
  @import 'uview-plus/index.scss';
  @import './style/index.scss';
  .animate__animated {
    animation-duration: 1s !important;
  }

  view {
    box-sizing: border-box;
  }

  .placeholder {
    color: #ccc;
  }
</style>
