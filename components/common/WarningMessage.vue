<template>
  <aside class="warning">
    <img
      src="/icons/info.svg"
      alt="Information icon"
    />
    <p
      v-html="message"
      class="warning__message"
    />
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  message: string,
}>();
</script>

<style lang="scss" scoped>
.warning {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  gap: 10px;
  border-radius: 4px;
  backdrop-filter: blur(32px);
  background-color: var(--white-10);

  &__message {
    margin: 0;
    font-family: var(--second-family), sans-serif;
    font-size: 14px;
    color: var(--orange-100);
  }
}
</style>
