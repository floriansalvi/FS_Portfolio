<script setup>
const props = defineProps({
    button: {
      type: Object,
      required: false
    }
});
</script>

<template>
  <div class="container">
    <div>
      <h3>{{ $t('global.banners.1.title') }}</h3>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--color-accent);
  padding: var(--spacing-xl);

  & h3 {
    font-size: var(--font-size-h1);
    width: 50%;
    height: fit-content;
    color: var(--color-txt-accent);
    transition: color 1s;
  }
}
</style>