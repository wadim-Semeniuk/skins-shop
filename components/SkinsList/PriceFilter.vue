<template>
  <nav class="filter">
    <div class="dropdown">
      <button
        :class="['dropdown__toggle', { 'dropdown__toggle--open': isOpen }]"
        @click="toggleDropdown"
      >
        <span class="dropdown__text">
          <img
            :src="selectedSortOption.icon"
            alt="Sort option icon"
          />
          {{ selectedSortOption.label }}
        </span>
        <ArrowIcon
          :style="{ rotate: isOpen ? '270deg' : '90deg' }"
          class="dropdown__arrow"
        />
      </button>

      <ul
        v-if="isOpen"
        class="dropdown__menu"
      >
        <li
          v-for="option in sortOptions"
          :key="option.value"
          class="dropdown__item"
          @click="selectSortOption(option)"
        >
          <img
            :src="option.icon"
            alt="Sort icon"
          />
          <span class="dropdown__item-text">
            {{ option.label }}
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type SortOption, SortOptionValue } from '~/types/types';
import ArrowIcon from '~/components/Icons/ArrowIcon.vue';

const props = defineProps<{
  selectedSortValue: SortOptionValue;
}>();

const emit = defineEmits<{
  (e: 'update:selected-sort-value', value: SortOptionValue): void;
}>();

const sortOptions = ref<SortOption[]>([
  { label: 'Price', icon: '/Icons/arrows/sort-arrow-down.svg', value: SortOptionValue.ASC },
  { label: 'Price', icon: '/Icons/arrows/sort-arrow-up.svg', value: SortOptionValue.DESC },
]);

const selectedSortOption = ref<SortOption>(sortOptions.value.find((s) => s.value === props.selectedSortValue) || sortOptions.value[0]);
const isOpen = ref<boolean>(false);

const toggleDropdown = () => isOpen.value = !isOpen.value;

const selectSortOption = (option: SortOption) => {
  selectedSortOption.value = option;
  isOpen.value = false;

  emit('update:selected-sort-value', option.value);
};
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 8px 12px;
  border-radius: 4px;
  background: var(--bg-card-light);
  box-shadow: 0 4px 8px 0 var(--black-20);
}

.dropdown {
  position: relative;
  margin-left: auto;

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 240px;
    padding: 12px;
    border-radius: 4px;
    background: var(--black-20);
    border: 1px solid var(--white-10);
    color: var(--white-100);

    &--open {
      background: var(--white-20);
      border-color: var(--white-20);
      border-radius: 4px 4px 0 0;
    }
  }

  &__text {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    line-height: 114%;
  }

  &__arrow {
    width: 12px;
    height: 12px;
    transition: all 0.3s ease-out;
  }

  &__menu {
    position: absolute;
    z-index: 100;
    width: 100%;
    margin: 0;
    padding: 12px 0;
    background: var(--white-20);
    border: 1px solid var(--white-20);
    border-radius: 0 0 4px 4px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 12px;
    color: var(--white-100);
    transition: all 0.3s ease-out;

    &:hover {
      background: var(--white-10);
      color: var(--accent-text-light-100);
    }

    &-text {
      font-size: 14px;
      line-height: 114%;
    }
  }
}
</style>
