<template>
  <div
    v-if="countries.length"
    class="dropdown"
  >
    <button class="dropdown-toggle" @click="toggleDropdown">
      <img :src="selectedCountry.logo" alt="Country Flag" class="flag" />
      <span class="dropdown-toggle-text">{{ selectedCountry.title }}</span>
      <ArrowIcon
        class="dropdown-toggle-arrow"
        :style="{ 'rotate': isOpen ? '270deg' : '90deg' }"
      />
    </button>
    <div v-if="isOpen" class="dropdown-menu">
      <div
        v-for="country in countries"
        :key="country.id"
        class="dropdown-item"
        @click="selectCountry(country)"
      >
        <img :src="country.logo" alt="Country Flag" class="flag" />
        <span class="dropdown-item-text">{{ country.title }}</span>
      </div>
    </div>
  </div>
  <div :class="['methods', { 'methods-disabled': disabledMethods}]">
    <div
      v-for="payment in selectedCountry?.payments"
      :key="payment.id"
      :class="['method', { 'method-active': payment.id === selectedMethodId}]"
      @click="selectPaymentMethodType(payment)"
    >
      <img :src="payment.image" :alt="payment.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Country, type Payment, PaymentType } from '~/types/types';
import { ref } from '#imports';
import { onMounted } from 'vue';
import ArrowIcon from '~/components/ArrowIcon.vue';

const props = defineProps<{
  disabledMethods: boolean,
}>();

const emit = defineEmits<{
  (e: 'set-payment-type', type: PaymentType): void;
}>();

const isOpen = ref(false);
const countries = ref<Country[]>([]);
const selectedCountry = ref<Country>({});
const selectedMethodId = ref<string>();

const toggleDropdown = () => isOpen.value = !isOpen.value;

const selectCountry = (country: Country) => {
  selectedCountry.value = country;
  isOpen.value = false;
};

const selectPaymentMethodType = (method: Payment) => {
  if (props.disabledMethods) {
    return;
  }

  selectedMethodId.value = method.id;
  emit('set-payment-type', method.type);
};

const fetchCountries = async () => {
  try {
    const response = await fetch('/api/countries');
    const data = await response.json();
    countries.value = data.data;
    selectedCountry.value = countries.value[0];
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

onMounted(() => {
  fetchCountries();
});
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  margin: 10px 0;
}

.dropdown-toggle {
  background-color: transparent;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  padding: 0px 8px;
  gap: 7px;
}

.dropdown-toggle-text {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--white-80);
}

.dropdown-toggle-arrow {
  width: 12px;
  height: 12px;
  rotate: 90deg;
  transition: all 0.3s ease-out;
}

.dropdown-menu {
  position: absolute;
  margin-top: 5px;
  width: 376px;
  z-index: 10;
  border: 1px solid var(--white-20);
  border-radius: 4px;
  padding: 12px 0;
  background: var(--bg-card-default);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 5px 12px;
  cursor: pointer;
  gap: 10px;
  color: var(--white-100);
}
.dropdown-item-text {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.dropdown-item:hover {
  background: var(--white-10);
  color: var(--accent-text-light-100);
}

.methods {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  margin-top: 12px;
}

.methods-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.method {
  cursor: pointer;
  border: 1px solid var(--white-10);
  border-radius: 4px;
  background: var(--black-20);
  padding: 12px;
}

.method-active {
  background: linear-gradient(150deg, #264ba8 0%, #030c23 100%);
}
</style>
