<template>
  <header class="header">
    <div class="logo">
      <img src="/public/icons/logo.svg" alt="logo" />
    </div>
    <div class="title-wrapper">
      <span class="title">
        Sell CS:GO skins
      </span>
      <img src="/public/icons/header-bg.svg" alt="header-bg" />
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.header {
  backdrop-filter: blur(32px);
  background: var(--bg-main-40);
}

.logo {
  padding: 15px 32px;
}

.title-wrapper {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(148deg, #011c0a 0%, #2e58c3 70.56%, #f9ffb2 100%);
}

.title {
  margin-left: 32px;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  color: var(--white-100);
}
</style>

