<template>
  <Header />
  <main class="page__content">
    <SkinsList />
  </main>
  <Footer />
</template>

<script setup>
import SkinsList from '~/components/SkinsList/SkinsList.vue';
import Header from '~/components/common/BaseHeader.vue';
import Footer from '~/components/common/BaseFooter.vue';
</script>

<style lang="scss" scoped>
.page__content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: fit-content;
  margin: 20px auto 0;
}
</style>

