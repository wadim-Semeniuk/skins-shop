<template>
  <footer class="footer">
    <figure class="footer__logo">
      <img
        src="/icons/logo.svg"
        alt="Many.Skins logo"
      />
    </figure>
    <div class="footer__content">
      <small class="footer__copyright">
        Copyright © Many.Skins 2024. All Rights Reserved.<br />
        Powered by Steam. Not affiliated with Valve Corp.
      </small>
      <section
        class="footer__partners"
        aria-label="Partners"
      >
        <img
          src="/icons/partners/master-card.svg"
          alt="MasterCard logo"
        />
        <img
          src="/icons/partners/visa.svg"
          alt="Visa logo"
        />
        <img
          src="/icons/partners/sepa.svg"
          alt="SEPA logo"
        />
        <img
          src="/icons/partners/skrill.svg"
          alt="Skrill logo"
        />
        <img
          src="/icons/partners/bitcoin.svg"
          alt="Bitcoin logo"
        />
        <img
          src="/icons/partners/tether.svg"
          alt="Tether logo"
        />
        <img
          src="/icons/partners/etherneum.svg"
          alt="Ethereum logo"
        />
      </section>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.footer {
  padding: 32px;
  background-color: var(--bg-card-default);

  &__logo {
    margin: 10px 0 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--white-10);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__copyright {
    font-family: var(--second-family), sans-serif;
    font-size: 12px;
    color: var(--white-60);
  }

  &__partners {
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
  }
}
</style>

