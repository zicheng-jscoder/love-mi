<script setup lang="ts">
  import { nextTick, onMounted, ref, toRefs, watch } from 'vue'
  import BN from 'bignumber.js'

  const instance = getApp()
  const props = defineProps({
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    modelValue: {
      type: Number,
      default: 100,
    },
  })

  const { max, modelValue, min } = toRefs(props)

  // const percentage = ref(0)
  const left = ref(0)

  watch(
    max,
    () => {
      nextTick(() => {
        const per = +new BN(modelValue.value).div(max.value)
        getMoveInfo(per)
      })
    },
    {
      immediate: true,
      deep: true,
    }
  )

  // onMounted(() => {
  //   getMoveInfo()
  // })

  let boxWidth: BN.Value = 0

  let pl: BN.Value = 0
  function getMoveInfo(per = 0) {
    const query = uni.createSelectorQuery().in(instance)
    query
      .select('#box')
      .boundingClientRect((res) => {
        boxWidth = new BN(res.left || 0).plus(res.width || 0)
        pl = res.left || 0
        if (per) {
          left.value = +new BN(boxWidth).minus(pl).times(per)
        }
      })
      .exec()
  }

  function touchmove(e: TouchEvent) {
    if (e.changedTouches[0].clientX > +new BN(boxWidth).minus(pl)) {
      left.value = +new BN(boxWidth).minus(pl)
      return computedEmits()
    }

    left.value = e.changedTouches[0].clientX
    computedEmits()
  }

  function computedEmits() {
    const w = new BN(boxWidth).minus(pl)
    const current = +new BN(left.value)
    const emitValue = parseInt('' + new BN(current).div(w).times(max.value))
    if (emitValue > +new BN(max.value).minus(min.value)) {
      return emits('update:modelValue', max.value)
    }

    if (emitValue < min.value) {
      return emits('update:modelValue', min.value)
    }

    emits('update:modelValue', emitValue)
  }

  const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <view class="relative wp-100 h-30 row align-center" id="box">
    <view class="wp-100 h-4 relative bg-cccccc br-2">
      <view
        class="absolute top-0 left-0 hp-100 bg-FF6B8F br-2"
        :style="{
          width: left + 'px',
        }"
      ></view>
    </view>
    <view
      class="absolute left-0 top-0 w-16 h-30 br-8 border-cccccc bg-ffffff"
      :style="{
        left: left + 'px',
      }"
      id="indicator"
      @touchmove="touchmove"
    ></view>
  </view>
</template>
