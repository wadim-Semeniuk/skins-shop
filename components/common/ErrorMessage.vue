<template>
  <p class="error">
    {{ message }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  message: string,
}>();
</script>

<style lang="scss" scoped>
.error {
  display: block;
  margin: 0;
  padding: 12px;
  border-radius: 4px;
  background-color: var(--red-100);
  font-family: var(--second-family), sans-serif;
  font-size: 14px;
  color: var(--white-100);
}
</style>

