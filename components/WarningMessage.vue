<template>
  <div class="wrapper">
    <img src="/public/icons/info.svg" alt="info" />
    <span v-html="message" class="warning-message"/>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string,
}>();
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
  padding: 12px;
  gap: 10px;

  backdrop-filter: blur(32px);
  background: var(--white-10);
}

.warning-message {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 14px;
  color: var(--orange-100);
}
</style>
