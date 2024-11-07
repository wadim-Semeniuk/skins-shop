<template>
  <div>
    <Header />
    <div class="container">
      <SkinList />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import SkinList from '~/components/SkinList.vue';
import Header from '~/components/BaseHeader.vue';
import Footer from '~/components/BaseFooter.vue';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: fit-content;
  margin: 20px auto 0;
}
</style>
