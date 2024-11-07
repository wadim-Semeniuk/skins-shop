<template>
  <section class="info">
    <div
      v-for="(item, index) in paymentInfo.filter((i) => i.visible)"
      :key="index"
      class="info__item"
    >
      <dt class="info__title">
        {{ item.title }}
      </dt>
      <span class="info__dots"/>
      <dd class="info__value">
        {{ item.value }}
      </dd>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type PaymentInfoItem } from '~/types/types';

defineProps<{
  paymentInfo: PaymentInfoItem[],
}>();
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  backdrop-filter: blur(32px);
  background-color: var(--white-10);
  padding: 12px;
  border-radius: 4px;

  &__item {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    color: #ffffff;
    font-size: 18px;
  }

  &__title {
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--white-100);
  }

  &__dots {
    flex-grow: 1;
    margin: 0 6px;
    border-bottom: 1px dotted var(--white-20);
    height: 0;
  }

  &__value {
    margin-left: 0px;
    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--green-100);
  }
}
</style>


