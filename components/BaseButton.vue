<template>
  <button
    :class="[
      'button',
      { [`theme-${theme}`]: !!theme },
      { 'button-disabled': disabled },
    ]"
    :disabled="disabled"
  >
    <slot name="beforeSlot" />
    <span>{{ text }}</span>
    <slot name="afterSlot" />
  </button>
</template>

<script setup lang="ts">
export type ButtonTheme = 'outline' | 'primary' | 'secondary';

defineProps<{
  text: string;
  theme: ButtonTheme;
  disabled?: boolean;
}>();
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  border-radius: 4px;
  padding: 21px 0;
  border: none;
  transition: all 0.3s ease-out;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
  letter-spacing: 0.03em;
  text-transform: uppercase;

  &.theme-primary {
    background: var(--accent-100);
    color: var(--white-100);
  }

  &.theme-secondary {
    background: var(--white-100);
    color: var(--accent-100);
    padding: 16px 0;
    font-size: 14px;
    line-height: 114%;

  }

  &.theme-outline {
    background: transparent;
    color: var(--white-60);

  }

  &:not(.button-disabled):hover {
    opacity: 0.9;
    box-shadow: 0 4px 4px 0 var(--black-20);
  }
}

.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
