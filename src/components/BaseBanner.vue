<script setup>
import BaseLinkButton from './BaseLinkButton.vue';
const props = defineProps({
    button: {
      type: Object,
      required: false
    }
});
</script>

<template>
  <div class="container banner">
      <h3>{{ $t('global.banners.1.title') }}</h3>
      <BaseLinkButton
        link="florian.salvi@icloud.com"
        type="mailto"
        text="Me contacter"
        src="mail"
        :external="false"
        :negative="true"
        class="btn"
      />
  </div>
</template>

<style scoped>
.banner {
  background-color: var(--color-accent);
  padding: var(--spacing-xl);
  border-radius: var(--radius-l);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-m);
}

.banner h3 {
  font-size: var(--font-size-h1);
  color: var(--color-txt-accent);
  flex: 0 1 70%;
  min-width: 50%;
  height: fit-content;
  margin: 0;
  overflow-wrap: break-word;
}

.banner .btn {
  flex: 0 0 auto;
  min-width: 0;
}
</style>