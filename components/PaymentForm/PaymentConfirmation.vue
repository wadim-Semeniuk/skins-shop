<template>
  <div class="confirmation-wrapper">
    <div :class="['timer-wrapper', { 'timer-wrapper-error': !!errorMessage }]">
      <span class="timer">{{ formattedTime }}</span>
      <span class="timer-description">
        You have 6 mins to accept trade, otherwise it will be canceled.
      </span>
    </div>

    <WarningMessage :message="warningMessage" />

    <PaymentInfo :payment-info="confirmationDetails" />

    <ErrorMessage
      v-if="errorMessage"
      :message="errorMessage"
    />

    <div class="accept-trade">
      <span class="accept-trade-label">
        Accept trade:
      </span>
      <BaseButton
        :disabled="disabledAcceptTradeButton"
        theme="secondary"
        text="Accept trade"
        @click="acceptTrade"
      >
        <template #afterSlot>
          <AcceptTradeIcon />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from '#imports';
import PaymentInfo from '~/components/PaymentForm/PaymentInfo.vue';
import { type PaymentInfoItem, PaymentType } from '~/types/types';
import ErrorMessage from '~/components/ErrorMessage.vue';
import WarningMessage from '~/components/WarningMessage.vue';
import AcceptTradeIcon from '~/components/AcceptTradeIcon.vue';

const emit = defineEmits<{
  (e: 'accept-trade'): void;
}>();

const warningMessage = `
  Example of caution text. For a trade to be safe please check:<br>
  — Code in the message<br>
  — Bot name<br>
  — If you have 2 trades, one active and one canceled and so on...
`;

const errorMessage = ref<string>('');
const tradeCode = ref<string>('8WJ8SL');
const startTimeKey = 'tradeStartTime';
const timerDuration = 6 * 60 * 1000; // 6 хвилин у мілісекундах

// Отримуємо або створюємо час початку торгівлі
let startTime = localStorage.getItem(startTimeKey);
if (!startTime) {
  startTime = Date.now().toString();
  localStorage.setItem(startTimeKey, startTime);
}

const endTime = ref<number>(parseInt(startTime, 10) + timerDuration);
const remainingTime = ref<number>(Math.max(endTime.value - Date.now(), 0));

const disabledAcceptTradeButton = computed((): boolean => !!errorMessage.value.length);

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / (60 * 1000));
  const seconds = Math.floor((remainingTime.value % (60 * 1000)) / 1000);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const updateTimer = () => {
  remainingTime.value = endTime.value - Date.now();
  if (remainingTime.value <= 0) {
    remainingTime.value = 0;
    clearInterval(timerInterval);
    localStorage.removeItem(startTimeKey);
    errorMessage.value = 'Time is over. Start new trade proccess.';
  }
};

const timerInterval = setInterval(updateTimer, 1000);

onMounted(() => updateTimer());

const acceptTrade = () => {
  clearInterval(timerInterval);
  localStorage.removeItem(startTimeKey);
  emit('accept-trade');
  startTime = '';
  endTime.value = 0;
  remainingTime.value = 0;
};

const confirmationDetails = ref<PaymentInfoItem[]>([
  {
    title: 'Trade code',
    value: `${tradeCode.value}`,
    visible: true,
  },
  {
    title: 'Bot name',
    value: 'skins_shop',
    visible: true,
  },
  {
    title: 'Bot level',
    value: '0 level',
    visible: true,
  },
  {
    title: 'Bot registration date',
    value: '01.02.2022',
    visible: true,
  },
]);

onBeforeUnmount(() => {
  clearInterval(timerInterval);
  localStorage.removeItem(startTimeKey);
});
</script>

<style lang="scss" scoped>
.confirmation-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.timer-wrapper {
  border: 1px solid var(--accent-text-light-100);
  color: var(--accent-text-light-100);
  border-radius: 4px;
  padding: 12px;
}

.timer-wrapper-error {
  border-color: var(--red-100);
  color: var(--red-100);
}

.timer {
  display: block;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 36px;
  line-height: 117%;
}

.timer-description {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  color: var(--white-80);
}

.accept-trade {
  border-radius: 4px;
  padding: 12px;
  margin-top: 16px;
  background: var(--white-10);
}

.accept-trade-label {
  display: block;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 14px;
  line-height: 114%;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--white-100);
  margin-bottom: 10px;
}
</style>
