<template>
  <section class="transfer-state">
    <img
      :src="currentState.image"
      :alt="currentState.title"
    />
    <h2 class="transfer-state__title">
      {{ currentState.title }}
    </h2>
    <p class="transfer-state__description">
      {{ currentState.description }}
    </p>

    <BaseButton
      theme="primary"
      :text="currentState.buttonText"
      @click="currentState.click"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseButton from '~/components/common/BaseButton.vue';
import { type TransferState, TransferStatus } from '~/types/types';

const props = defineProps<{
  status: TransferStatus,
}>();

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
.transfer-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;

  &__title {
    font-family: var(--second-family), sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 100%;
    text-align: center;
    color: var(--white-100);
    margin-top: 15px;
    margin-bottom: 5px;
  }

  &__description {
    font-family: var(--second-family), sans-serif;
    font-size: 14px;
    text-align: center;
    color: var(--white-80);
    margin-top: 0;
    margin-bottom: 32px;
  }
}
</style>
