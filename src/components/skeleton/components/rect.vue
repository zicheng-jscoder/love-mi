<template>
  <view class="bg-F8F8F8 border-radius-4" :class="defaultClass"></view>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'

  const { className } = defineProps({
    className: {
      type: Array,
      default: () => [],
    },
  })

  const defaultClass = ref(['bg-1e262f'])

  onMounted(() => {
    defaultClass.value = [...(className as string[]), ...defaultClass.value]
  })
</script>

<style lang="scss" scoped>
  .rect-144 {
    width: 144rpx;
    height: 144rpx;
  }

  @each $var in 288 {
    .h-#{$var} {
      height: $var * 1rpx;
    }

    .w-#{$var} {
      width: $var * 1rpx;
    }
  }
</style>
