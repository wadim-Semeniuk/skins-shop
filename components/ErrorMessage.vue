<template>
  <span class="error-message">{{ message }}</span>
</template>

<script setup lang="ts">
defineProps<{
  message: string,
}>();
</script>

<style lang="scss" scoped>
.error-message {
  display: block;
  font-family: var(--second-family);
  font-size: 14px;
  color: var(--white-100);
  padding: 12px;
  border-radius: 4px;
  background: var(--red-100);
}
</style>
