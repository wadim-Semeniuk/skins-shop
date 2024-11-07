<template>
  <section class="skins-list">
    <div
      v-if="disabled"
      class="skins-list__overlay"
    />

    <template v-if="sortedSkins.length">
      <PriceFilter v-model:selected-sort-value="selectedSortValue" />

      <div class="skins-list__grid">
        <SkinCard
          v-for="skin in sortedSkins"
          :key="skin.id"
          :skin="skin"
          :selected="selectedSkins.includes(skin)"
          @click="toggleSkinSelection(skin)"
        />
      </div>
    </template>
  </section>

  <PaymentForm
    :selected-skins="selectedSkins"
    @disable-table="disableTable"
    @clear-selected-skins="selectedSkins = []"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { type Skin, SortOptionValue } from '~/types/types';
import PriceFilter from '~/components/SkinsList/PriceFilter.vue';
import SkinCard from '~/components/SkinsList/SkinCard.vue';

const disabled = ref<boolean>(false);
const skins = ref<Skin[]>([]);
const sortedSkins = ref<Skin[]>([]);
const selectedSkins = ref<Skin[]>([]);
const selectedSortValue = ref<SortOptionValue>(SortOptionValue.ASC);

const sortSkins = () => {
  sortedSkins.value = [...skins.value].sort((a, b) => (
    selectedSortValue.value === SortOptionValue.ASC ? (a.price - b.price) : (b.price - a.price)
  ));
};

const fetchSkins = async () => {
  try {
    const response = await fetch('/api/skins');

    skins.value = (await response.json()).data;
    sortSkins();
  } catch (error) {
    console.error('Error fetching skins:', error);
  }
};

const disableTable = (value: boolean) => disabled.value = value;

const toggleSkinSelection = (skin: Skin) => {
  if (selectedSkins.value.includes(skin)) {
    selectedSkins.value = selectedSkins.value.filter(selectedSkin => selectedSkin.id !== skin.id);
  } else {
    selectedSkins.value.push(skin);
  }
};

onMounted(() => fetchSkins());
watch(selectedSortValue, () => sortSkins());
</script>

<style lang="scss" scoped>
.skins-list {
  width: 888px;
  position: relative;
  margin: 0;

  &__overlay {
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

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
  }
}
</style>
