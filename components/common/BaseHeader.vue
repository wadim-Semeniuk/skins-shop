<template>
  <header class="header">
    <figure class="header__logo">
      <img
        src="/icons/logo.svg"
        alt="Many.Skins logo"
      />
    </figure>
    <section class="header__content">
      <h1 class="header__title">
        Sell CS:GO skins
      </h1>
      <img
        src="/icons/header-bg.svg"
        alt="Header background"
      />
    </section>
  </header>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.header {
  backdrop-filter: blur(32px);
  background-color: var(--bg-main-40);

  &__logo {
    margin: 0;
    padding: 15px 32px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    background: linear-gradient(148deg, #011c0a 0%, #2e58c3 70.56%, #f9ffb2 100%);
  }

  &__title {
    margin-left: 32px;
    font-family: var(--second-family), sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 100%;
    color: var(--white-100);
  }
}
</style>
