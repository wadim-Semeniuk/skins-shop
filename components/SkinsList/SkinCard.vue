<template>
  <article
    class="skin-card"
    :class="{ 'skin-card--selected': selected }"
  >
    <div :class="['skin-card__checkbox', { 'skin-card__checkbox--checked': selected }]">
      <img
        v-if="selected"
        src="/public/icons/check-success.svg"
        alt="Check icon"
        class="skin-card__check-icon"
      />
    </div>
    <figure class="skin-card__image-container">
      <img
        :src="skin.image"
        :alt="skin.name"
        class="skin-card__image"
      />
      <img
        src="/public/icons/skin-bg.svg"
        alt="Background for skin"
        class="skin-card__image-bg"
      />
      <figcaption class="skin-card__name">
        {{ skin.name }}
      </figcaption>
    </figure>
    <p
      v-if="skin.exterior"
      class="skin-card__exterior"
      :style="{ color: skin.exterior?.css_color }"
    >
      {{ skin.exterior?.title }}
    </p>
    <div class="skin-card__price-container">
      <span class="skin-card__label">
        We pay
      </span>
      <p class="skin-card__price">
        ${{ skin.price.toFixed(2) }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { type Skin } from '~/types/types';

defineProps<{
  selected: boolean;
  skin: Skin;
}>();
</script>

<style lang="scss" scoped>
.skin-card {
  position: relative;
  width: 218px;
  padding: 16px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  background: var(--bg-card-light);
  box-shadow: 0 4px 8px 0 var(--black-20);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-out;

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
    background: var(--black-20);
    border: 1px solid var(--white-20);

    &--checked {
      border-color: var(--green-100);
    }
  }

  &__image {
    display: block;
    width: 179px;
    height: 112px;
    position: relative;
    z-index: 1;
    margin: 0 auto 20px;

    &-container {
      position: relative;
      width: 100%;
      margin: 0 0 10px 0;
    }

    &-bg {
      position: absolute;
      top: -10px;
      left: 0;
      width: 190px;
      height: 152px;
      z-index: 0;
    }
  }

  &__price-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__name {
    font-weight: 500;
    font-size: 14px;
    line-height: 114%;
    color: var(--white-100);
  }

  &__label, &__exterior {
    display: block;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--white-80);
  }

  &__price {
    margin: 0;
    font-weight: 500;
    font-size: 20px;
    color: var(--green-100);
  }
}
</style>
