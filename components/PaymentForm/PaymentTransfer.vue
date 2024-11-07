<template>
  <div class="wrapper">
    <img :src="currentState.image" :alt="currentState.title">
    <p class="title">
      {{ currentState.title }}
    </p>
    <span class="description">
      {{ currentState.description }}
    </span>
  </div>

  <BaseButton
    theme="primary"
    :text="currentState.buttonText"
    @click="currentState.click"
  />
</template>

<script setup lang="ts">
import { type TransferState, TransferStatus } from '~/types/types';
import { computed, ref } from '#imports';

const props = withDefaults(defineProps<{
  status: TransferStatus,
  isResetForm: boolean,
}>(), {
});

const emit = defineEmits<{
  (e: 'reset'): void;
}>();

const states = ref<Record<string, TransferState>>({
  [TransferStatus.SUCCESS]: {
    title: 'Transfer succeed!',
    description: 'Please check your balance',
    buttonText: 'Great!',
    image: '/icons/states/success.svg',
    click: () => emit('reset'),
  },
  [TransferStatus.ERROR]: {
    title: 'Transfer error',
    description: 'Please contact our support team to go through the issue',
    buttonText: 'Contact support',
    image: '/icons/states/error.svg',
    click: () => emit('reset'),
  },
});

const currentState = computed(() => states.value[props.status]);
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
}

.title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  color: var(--white-100);
  margin-top: 15px;
  margin-bottom: 5px;
}

.description {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: var(--white-80);
}
</style>
