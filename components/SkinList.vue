<template>
  <div class="skin-list">
    <div
      v-if="disabled"
      class="overlay"
    />
    <template v-if="sortedSkins.length">
      <div class="skin-list__filter">
        <div class="dropdown">
          <button
            :class="['dropdown-toggle', { 'dropdown-toggle-open': isOpen }]"
            @click="toggleDropdown"
          >
            <div class="dropdown-toggle-text-container">
              <img :src="selectedSortOption.icon" alt="arrow" />
              <span class="dropdown-toggle-text">{{ selectedSortOption.label }}</span>
            </div>
            <ArrowIcon
              class="dropdown-toggle-arrow"
              :style="{ 'rotate': isOpen ? '270deg' : '90deg' }"
            />
          </button>
          <div v-if="isOpen" class="dropdown-menu">
            <div
              v-for="option in sortOptions"
              :key="option.value"
              class="dropdown-item"
              @click="selectSortOption(option)"
            >
              <img :src="option.icon" alt="arrow" />
              <span class="dropdown-item-text">{{ option.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="skin-list__grid">
        <div
          v-for="skin in sortedSkins"
          :key="skin.id"
          class="skin-card"
          :class="{ 'skin-card--selected': selectedSkins.includes(skin) }"
          @click="toggleSkinSelection(skin)"
        >
          <div :class="['skin-card__checkbox', { 'skin-card__checkbox-checked': selectedSkins.includes(skin) }]">
            <img
              v-if="selectedSkins.includes(skin)"
              src="/icons/check-success.svg"
              alt="check success"
              class="skin-card__checkbox-check-icon"
            />
          </div>
          <div class="skin-card__image-container">
            <img :src="skin.image" :alt="skin.name" class="skin-card__image" />
            <img src="/icons/skin-bg.svg" alt="skin bg" class="skin-card__image-bg" />
            <h3 class="skin-card__name">{{ skin.name }}</h3>
          </div>
          <p
            v-if="skin.exterior"
            class="skin-card__exterior"
            :style="{ 'color': skin.exterior?.css_color }"
          >
            {{ skin.exterior?.title }}
          </p>
          <div class="price-container">
            <span class="skin-card__label">We pay</span>
            <span class="skin-card__price">${{ skin.price.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>

  <PaymentForm
    :selected-skins="selectedSkins"
    @disable-table="disableTable"
    @clear-selected-skins="selectedSkins = []"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type Skin, type SortOption, SortOptionValue } from '~/types/types';
import ArrowIcon from '~/components/ArrowIcon.vue';

const sortOptions = ref<SortOption[]>([
  {
    label: 'Price',
    icon: '/icons/arrows/sort-arrow-down.svg',
    value: SortOptionValue.ASC,
  },
  {
    label: 'Price',
    icon: '/icons/arrows/sort-arrow-up.svg',
    value: SortOptionValue.DESC,
  },
]);

const skins = ref<Skin[]>([]);
const selectedSkins = ref<Skin[]>([]);
const selectedSortOption = ref<SortOption>(sortOptions.value[0]);
const sortedSkins = ref<Skin[]>([]);
const disabled = ref<boolean>(false);
const isOpen = ref<boolean>(false);

const sortSkins = () => {
  if (selectedSortOption.value.value === SortOptionValue.ASC) {
    sortedSkins.value = [...skins.value].sort((a, b) => a.price - b.price);
  } else {
    sortedSkins.value = [...skins.value].sort((a, b) => b.price - a.price);
  }
};

const toggleDropdown = () => isOpen.value = !isOpen.value;
const selectSortOption = (option: SortOption) => {
  selectedSortOption.value = option;
  sortSkins();
};

// Завантаження даних при монтуванні
const fetchSkins = async () => {
  try {
    const response = await fetch('/api/skins');
    const data = await response.json();
    skins.value = data.data;
    sortSkins();
  } catch (error) {
    console.error('Error fetching skins:', error);
  }
};

onMounted(() => {
  fetchSkins();
});

const disableTable = (value: boolean) => {
  disabled.value = value;
}

const toggleSkinSelection = (skin: Skin) => {
  if (selectedSkins.value.includes(skin)) {
    selectedSkins.value = selectedSkins.value.filter(selectedSkin => selectedSkin.id !== skin.id);
  } else {
    selectedSkins.value.push(skin);
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  margin-left: auto;
  position: relative;
}
.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--white-10);
  border-radius: 4px;
  padding: 12px;
  width: 240px;
  background: var(--black-20);
  color: var(--white-100);
}

.dropdown-toggle-open {
  border-radius: 4px 4px 0 0;
  background: var(--white-20);
  border: 1px solid var(--white-20);
}

.dropdown-toggle-text-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
}

.dropdown-toggle-text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  line-height: 114%;
}

.dropdown-toggle-arrow {
  width: 12px;
  height: 12px;
  rotate: 90deg;
  transition: all 0.3s ease-out;
}

.dropdown-menu {
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  width: 100%;
  border-bottom: 1px solid var(--white-20);
  border-left: 1px solid var(--white-20);
  border-right: 1px solid var(--white-20);
  border-radius: 0 0 4px 4px;
  padding: 12px 0px;
  background: var(--white-20);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  color: var(--white-100);
  transition: all 0.3s ease-out;
}

.dropdown-item:hover {
  background: var(--white-10);
  color: var(--accent-text-light-100);
}

.dropdown-item-text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  line-height: 114%;
}

.skin-list {
  width: 888px;
  position: relative;

  .overlay {
    position: absolute;
    cursor: not-allowed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: var(--bg-card-default);
    opacity: 0.5;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  &__filter {
    border-radius: 4px;
    padding: 8px 12px;
    box-shadow: 0 4px 8px 0 var(--black-20);
    background: var(--bg-card-light);

    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &-label {
      margin-right: 10px;
      font-size: 16px;
      color: #fff;
    }

    &-dropdown {
      padding: 5px;
      font-size: 14px;
      background-color: #1e1e2d;
      border: 1px solid #333;
      color: #fff;
      border-radius: 4px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5px;
  }
}

.skin-card {
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 var(--black-20);
  border: 1px solid transparent;
  background: var(--bg-card-light);
  position: relative;
  width: 218px;
  padding: 16px 12px;
  transition: background-color 0.3s ease-out;

  &:hover {
    background: linear-gradient(150deg, #1d3570 0%, #110320 100%);
  }

  &--selected {
    border-color: var(--green-100);
  }

  &__checkbox {
    position: absolute;
    z-index: 10;
    top: 10px;
    right: 10px;
    cursor: pointer;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background-color: var(--black-20);
    border: 1px solid var(--white-20);
  }

  &__checkbox-checked {
    border-color: var(--green-100);
  }

  &__checkbox-check-icon {
    width: 100%;
    height: 100%;
  }

  &__image-container {
    position: relative;
    margin-bottom: 10px;
    width: 100%;
  }

  &__image {
    width: 179px;
    height: 112px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
  }

  &__image-bg {
    position: absolute;
    top: -10px;
    left: 0px;
    width: 190px;
    height: 152px;
    z-index: 0;
  }

  &__name {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 14px;
    line-height: 114%;
    margin: 0;
    color: var(--white-100);
  }

  &__exterior {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--white-60);
  }

  &__label {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--white-80);
  }

  &__price {
    display: block;
    margin-top: 3px;
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 20px;
    color: var(--green-100);
  }
}
</style>
