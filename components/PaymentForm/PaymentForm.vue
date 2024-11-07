<template>
  <section class="payment-form">
    <div class="payment-form__container">
      <p class="payment-form__total-items">
        {{ `${selectedSkins.length} items for` }}
      </p>
      <p class="payment-form__total-price">
        ${{ totalPrice.toFixed(2) }}
      </p>

      <div class="payment-form__stages">
        <div
          v-for="(stage, index) in stages"
          :key="stage.value"
          :class="['stage', { 'stage--active': stage.value === currentStage }]"
        >
          {{ stage.title }}
          <ArrowIcon
            v-if="index < stages.length - 1"
            class="stage__arrow"
          />
        </div>
      </div>
    </div>

    <div class="payment-form__components">
      <keep-alive :include="isResettingForm ? [] : ['PaymentMethods', 'PaymentDetails']">
        <component
          :is="componentMap[currentStage]"
          :status="paymentStatus"
          :disabled-methods="!selectedSkins.length"
          :payment-type="currentPaymentMethodType"
          :total-price="totalPrice"
          @set-payment-type="setPaymentType"
          @handle-input-valid="handleInputValid"
          @accept-trade="acceptTrade"
          @reset="resetForm"
        />
      </keep-alive>

      <BaseButton
        v-if="isNextButtonShown"
        :disabled="isNextButtonDisabled"
        theme="primary"
        text="Next"
        @click="changeStage('next')"
      >
        <template #afterSlot>
          <ArrowIcon />
        </template>
      </BaseButton>

      <BaseButton
        v-if="isBackButtonShown"
        theme="outline"
        text="Back"
        @click="changeStage('back')"
      >
        <template #beforeSlot>
          <ArrowIcon class="back-btn-arrow" />
        </template>
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, defineAsyncComponent } from 'vue';
import {
  PaymentStageValue,
  PaymentType,
  type Skin,
  type PaymentStage,
  TransferStatus,
} from '~/types/types';
import PaymentMethods from './PaymentMethods.vue';
import PaymentDetails from './PaymentDetails.vue';
import ArrowIcon from '~/components/Icons/ArrowIcon.vue';
import BaseButton from '~/components/common/BaseButton.vue';

const props = defineProps<{
  selectedSkins: Skin[],
}>();

const emit = defineEmits<{
  (e: 'disable-table', value: boolean): void;
  (e: 'clear-selected-skins'): void;
}>();

const componentMap = {
  [PaymentStageValue.METHOD]: PaymentMethods,
  [PaymentStageValue.DETAILS]: PaymentDetails,
  [PaymentStageValue.CONFIRMATION]: defineAsyncComponent(() => import('./PaymentConfirmation.vue')),
  [PaymentStageValue.TRANSFER]: defineAsyncComponent(() => import('./PaymentTransfer.vue')),
};

const isResettingForm = ref(false);
const isInputValid = ref(false);
const paymentStatus = ref(TransferStatus.SUCCESS);
const currentStage = ref(PaymentStageValue.METHOD);
const currentPaymentMethodType = ref<PaymentType>();

const totalPrice = computed(() => props.selectedSkins.reduce((acc, skin) => acc + skin.price, 0));

const isNextButtonDisabled = computed((): boolean => (
  !currentPaymentMethodType.value || (!isInputValid.value && currentStage.value === PaymentStageValue.DETAILS) || totalPrice.value === 0
));
const isNextButtonShown = computed((): boolean => (
  [PaymentStageValue.METHOD, PaymentStageValue.DETAILS].includes(currentStage.value)
));
const isBackButtonShown = computed((): boolean => (
  [PaymentStageValue.DETAILS, PaymentStageValue.CONFIRMATION].includes(currentStage.value)
));

const stages = ref<PaymentStage[]>([
  {
    title: 'Payment method',
    value: PaymentStageValue.METHOD,
  },
  {
    title: 'Payment details',
    value: PaymentStageValue.DETAILS,
  },
  {
    title: 'Confirmation on Steam',
    value: PaymentStageValue.CONFIRMATION,
  },
  {
    title: 'Payment transfer',
    value: PaymentStageValue.TRANSFER,
  },
]);

const changeStage = (direction: 'next' | 'back') => {
  const currentIndex = stages.value.findIndex(stage => stage.value === currentStage.value);

  if (direction === 'next' && currentIndex < stages.value.length - 1) {
    currentStage.value = stages.value[currentIndex + 1].value;
  } else if (direction === 'back' && currentIndex > 0) {
    currentStage.value = stages.value[currentIndex - 1].value;
  }
};

const setPaymentType = (type: PaymentType) => (currentPaymentMethodType.value = type);

const resetForm = () => {
  isResettingForm.value = true;
  isInputValid.value = false;
  emit('clear-selected-skins');
  emit('disable-table', false);
  currentStage.value = PaymentStageValue.METHOD;
  currentPaymentMethodType.value = undefined;

  setTimeout(() => (isResettingForm.value = false), 0);
};

const getRandomStatus = (): TransferStatus => (Math.random() > 0.5 ? TransferStatus.SUCCESS : TransferStatus.ERROR);

const acceptTrade = () => {
  paymentStatus.value = getRandomStatus();
  changeStage('next');
};

const handleInputValid = (value: boolean) => {
  isInputValid.value = value;
};

watch(currentStage, (newStage) => emit('disable-table', newStage !== PaymentStageValue.METHOD));

onMounted(() => {
  if (localStorage.getItem('tradeStartTime')) {
    currentStage.value = PaymentStageValue.CONFIRMATION;
  }
});
</script>

<style lang="scss" scoped>
.payment-form {
  width: 400px;
  overflow: hidden;
  border-radius: 4px;
  background: var(--bg-card-light);
  box-shadow: 0 4px 8px 0 var(--black-20);

  &__container {
    padding: 20px;
    background: linear-gradient(153deg, #223056 0%, #0e1526 100%);
  }

  &__total-items {
    margin: 0;
    font-size: 14px;
    line-height: 114%;
    color: var(--white-80);
  }

  &__total-price {
    font-weight: 500;
    font-size: 48px;
    line-height: 100%;
    color: var(--green-100);
    margin-top: 5px;
    padding-bottom: 14px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--white-10);
  }

  &__stages {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stage {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--white-60);

    &__arrow {
      margin: 0 7px;
      color: var(--white-60);
      flex-shrink: 0;
    }

    &--active {
      color: var(--orange-100);
    }
  }

  &__components {
    padding: 12px;
    display: flex;
    flex-direction: column;
  }

  .back-btn-arrow {
    rotate: 180deg;
  }
}
</style>
