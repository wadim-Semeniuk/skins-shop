<template>
  <div class="detail-wrapper">
    <WarningMessage
      v-if="paymentType === PaymentType.CARD"
      :message="warningMessage"
    />
    <PaymentInfo :payment-info="paymentDetails" />

    <div class="input-wrapper">
      <input
        v-model="inputValue"
        :placeholder="placeholder"
        type="text"
        :class="['input', { 'input-error': errorMessage }]"
        @blur="handleBlur"
        @input="handleInput"
        @keydown.enter="handleBlur"
      />
      <label class="input-label">{{ placeholder }}</label>
      <ErrorMessage
        v-if="errorMessage"
        :message="errorMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PaymentInfoItem, PaymentType } from '~/types/types';
import { computed, ref, watch, } from '#imports';
import PaymentInfo from '~/components/PaymentForm/PaymentInfo.vue';
import ErrorMessage from '~/components/ErrorMessage.vue';
import WarningMessage from '~/components/WarningMessage.vue';

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

const isCryptoPaymentType = computed((): boolean => props.paymentType === PaymentType.CRYPTO);
const placeholder = computed((): string => isCryptoPaymentType.value ? 'Your tether wallet' : 'Your card number');
const priceWithCommission = computed((): number => props.totalPrice - ((props.totalPrice / 100) * commission.value));
const cryptoAmount = computed((): number => priceWithCommission.value * 0.98);
const formattedInputValue = computed((): string => inputValue.value.replace(/\s/g, ''));

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

<style scoped>
.detail-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-wrapper {
  margin: 6px 0;
  position: relative;
}

.input {
  box-sizing: border-box;
  border: 1px solid var(--white-10);
  border-radius: 4px;
  padding: 0 12px;
  width: 100%;
  height: 48px;
  background: var(--black-20);
  font-family: var(--font-family);
  font-size: 12px;
  line-height: 100%;
  color: var(--white-80);
}

.input-error {
  border-color: var(--red-100);
}

.input::placeholder {
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--white-80);
}

.input-label {
  font-family: var(--font-family);
  position: absolute;
  top: 8px;
  left: 12px;
  transition: 0.2s ease;
  font-size: 8px;
  line-height: 100%;
  pointer-events: none;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--white-80);
}

.input:placeholder-shown + .input-label {
  opacity: 0;
  transform: translateY(10px);
}

.input:not(:placeholder-shown) + .input-label {
  opacity: 1;
  transform: translateY(0);
}
</style>
