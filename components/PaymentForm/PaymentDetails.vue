<template>
  <section class="detail">
    <WarningMessage
      v-if="paymentType === PaymentType.CARD"
      :message="warningMessage"
    />

    <PaymentInfo :payment-info="paymentDetails" />

    <div class="detail__input-wrapper">
      <input
        v-model="inputValue"
        :placeholder="placeholder"
        type="text"
        :class="['detail__input', { 'detail__input--error': errorMessage }]"
        @blur="handleBlur"
        @input="handleInput"
        @keydown.enter="handleBlur"
      />
      <label class="detail__input-label">
        {{ placeholder }}
      </label>
      <ErrorMessage
        v-if="errorMessage"
        :message="errorMessage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { type PaymentInfoItem, PaymentType } from '~/types/types';
import PaymentInfo from '~/components/common/BaseInfoCard.vue';
import ErrorMessage from '~/components/common/ErrorMessage.vue';
import WarningMessage from '~/components/common/WarningMessage.vue';

const props = defineProps<{
  paymentType: PaymentType,
  totalPrice: number,
}>();

const emit = defineEmits<{
  (e: 'handle-input-valid', value: boolean): void;
}>();

const inputValue = ref<string>('');
const errorMessage = ref<string>('');
const commission = ref<number>(2);

const isCryptoPaymentType = computed((): boolean => (props.paymentType === PaymentType.CRYPTO));
const placeholder = computed((): string => (isCryptoPaymentType.value ? 'Your tether wallet' : 'Your card number'));
const priceWithCommission = computed((): number => (props.totalPrice - ((props.totalPrice / 100) * commission.value)));
const cryptoAmount = computed((): number => (priceWithCommission.value * 0.98));
const formattedInputValue = computed((): string => (inputValue.value.replace(/\s/g, '')));

const warningMessage = `
  The amount may not be the same as shown on your wallet due to differences in exchange rates.<br><br>
  It may take up to three business days for the bank to credit your payment. Please wait for the transaction.
`;

const paymentDetails = ref<PaymentInfoItem[]>([
  {
    title: 'Transaction commission',
    value: `${commission.value}%`,
    visible: true,
  },
  {
    title: 'You receive',
    value: `$${priceWithCommission.value}`,
    visible: true,
  },
  {
    title: 'Crypto amount',
    value: `${cryptoAmount.value} USDT`,
    visible: isCryptoPaymentType.value,
  },
]);

const handleInput = (event: Event) => {
  if (!isCryptoPaymentType.value) {
    // Remove any non-digit characters from the input and add spaces every 4 characters for display and trim any extra space at the end
    inputValue.value = (event.target as HTMLInputElement).value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  errorMessage.value = '';
};

const validateInput = () => {
  if (isCryptoPaymentType.value) {
    const cryptoPattern = /^[a-zA-Z0-9]{34,42}$/;

    if (!cryptoPattern.test(formattedInputValue.value)) {
      errorMessage.value = 'Enter valid tether wallet';
      emit('handle-input-valid', false);

      return;
    }
  } else {
    const cardPattern = /^\d{16}$/;

    if (!cardPattern.test(formattedInputValue.value)) {
      errorMessage.value = 'Enter valid card number';
      emit('handle-input-valid', false);

      return;
    }
  }

  errorMessage.value = '';
  emit('handle-input-valid', true);
};

const handleBlur = () => validateInput();

watch(() => props.paymentType, () => {
  inputValue.value = '';
  errorMessage.value = '';
});
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__input-wrapper {
    position: relative;
    margin: 6px 0 16px;
  }

  &__input {
    width: 100%;
    height: 48px;
    padding: 0 12px;
    margin: 6px 0 16px;
    border-radius: 4px;
    border: 1px solid var(--white-10);
    background: var(--black-20);
    color: var(--white-80);
    font-size: 12px;
    line-height: 100%;

    &::placeholder {
      font-size: 12px;
      line-height: 100%;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: var(--white-80);
    }

    &:placeholder-shown + .detail__input-label {
      opacity: 0;
      transform: translateY(10px);
    }

    &:not(:placeholder-shown) + .detail__input-label {
      opacity: 1;
      transform: translateY(0);
    }

    &--error {
      border-color: var(--red-100);
    }

    &-label {
      position: absolute;
      top: 12px;
      left: 12px;
      font-size: 8px;
      line-height: 100%;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: var(--white-80);
      pointer-events: none;
      transition: all 0.2s ease;
    }
  }
}
</style>
