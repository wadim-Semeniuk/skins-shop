<template>
  <footer class="footer">
    <div class="logo">
      <img src="/public/icons/logo.svg" alt="logo" />
    </div>
    <div class="title-wrapper">
      <span class="title">
        Copyright © Many.Skins 2024. All Rights Reserved.<br/>
        Powered by Steam. Not affiliated with Valve Corp.
      </span>
      <div class="partners-wrapper">
        <img src="/public/icons/partners/master-card.svg" alt="master-card" />
        <img src="/public/icons/partners/visa.svg" alt="visa" />
        <img src="/public/icons/partners/sepa.svg" alt="sepa" />
        <img src="/public/icons/partners/skrill.svg" alt="skrill" />
        <img src="/public/icons/partners/bitcoin.svg" alt="bitcoin" />
        <img src="/public/icons/partners/tether.svg" alt="tether" />
        <img src="/public/icons/partners/etherneum.svg" alt="etherneum" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.footer {
  padding: 32px;
  background: var(--bg-card-default);
}

.logo {
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--white-10);
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 12px;
  color: var(--white-60);
}

.partners-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}
</style>

