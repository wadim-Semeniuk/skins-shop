<template>
  <section class="payment-info">
    <div
      v-for="(item, index) in paymentInfo"
      :key="index"
      class="payment-info__item"
    >
      <template v-if="item.visible">
        <dt class="payment-info__title">{{ item.title }}</dt>
        <span class="payment-info__dots"></span>
        <dd class="payment-info__value">{{ item.value }}</dd>
      </template>
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
.payment-info {
  backdrop-filter: blur(32px);
  background: var(--white-10);
  padding: 12px;
  border-radius: 4px;
}

.payment-info__item {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: #ffffff;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 18px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0; // видалення нижнього відступу для останнього елемента
  }
}

.payment-info__title {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--white-100);
}

.payment-info__dots {
  flex-grow: 1;
  margin: 0 6px;
  border-bottom: 1px dotted var(--white-20); // стилізація крапок
  height: 0;
}

.payment-info__value {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  margin-left: 0px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--green-100);
}
</style>

