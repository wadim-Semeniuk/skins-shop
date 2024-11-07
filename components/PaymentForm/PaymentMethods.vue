<template>
  <section
    v-if="countries.length"
    class="dropdown"
  >
    <button
      class="dropdown__toggle"
      @click="toggleDropdown"
    >
      <img
        :src="selectedCountry?.logo"
        alt="Country Flag"
        class="dropdown__flag"
      />
      <span class="dropdown__toggle-text">
        {{ selectedCountry?.title }}
      </span>
      <ArrowIcon
        class="dropdown__toggle-arrow"
        :style="{ rotate: isOpen ? '270deg' : '90deg' }"
      />
    </button>
    <ul
      v-if="isOpen"
      class="dropdown__menu"
    >
      <li
        v-for="country in countries"
        :key="country.id"
        class="dropdown__item"
        @click="selectCountry(country)"
      >
        <img
          :src="country.logo"
          alt="Country Flag"
          class="dropdown__flag"
        />
        <span class="dropdown__item-text">
          {{ country.title }}
        </span>
      </li>
    </ul>
  </section>

  <section :class="['methods', { 'methods--disabled': disabledMethods }]">
    <div
      v-for="payment in selectedCountry?.payments"
      :key="payment.id"
      :class="['method', { 'method--active': payment.id === selectedMethodId }]"
      @click="selectPaymentMethodType(payment)"
    >
      <img
        :src="payment.image"
        :alt="payment.id"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ArrowIcon from '~/components/Icons/ArrowIcon.vue';
import { type Country, type Payment, PaymentType } from '~/types/types';

const props = defineProps<{
  disabledMethods: boolean,
}>();

const emit = defineEmits<{
  (e: 'set-payment-type', type: PaymentType): void;
}>();

const isOpen = ref(false);
const countries = ref<Country[]>([]);
const selectedCountry = ref<Country>();
const selectedMethodId = ref<string>();

const toggleDropdown = () => (isOpen.value = !isOpen.value);

const selectCountry = (country: Country) => {
  selectedCountry.value = country;
  isOpen.value = false;
};

const selectPaymentMethodType = (method: Payment) => {
  if (props.disabledMethods) return;

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

onMounted(fetchCountries);
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  margin: 10px 0;

  &__toggle {
    background-color: transparent;
    color: #fff;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    padding: 0 8px;
    gap: 7px;
  }

  &__toggle-text {
    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--white-80);
  }

  &__toggle-arrow {
    width: 12px;
    height: 12px;
    rotate: 90deg;
    transition: all 0.3s ease-out;
  }

  &__menu {
    position: absolute;
    margin: 5px 0 0;
    width: 376px;
    z-index: 10;
    border: 1px solid var(--white-20);
    border-radius: 4px;
    padding: 12px 0;
    background: var(--bg-card-default);
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 5px 12px;
    cursor: pointer;
    gap: 10px;
    color: var(--white-100);

    &:hover {
      background: var(--white-10);
      color: var(--accent-text-light-100);
    }
  }

  &__item-text {
    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  &__flag {
    width: 20px;
    height: 14px;
  }
}

.methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  cursor: pointer;
  margin-top: 12px;
  margin-bottom: 16px;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.method {
  border: 1px solid var(--white-10);
  border-radius: 4px;
  background: var(--black-20);
  padding: 12px;

  &--active {
    background: linear-gradient(150deg, #264ba8 0%, #030c23 100%);
  }
}
</style>
