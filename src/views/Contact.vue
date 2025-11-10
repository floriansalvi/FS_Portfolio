<script setup>
import TheContactForm from '../components/TheContactForm.vue';
import TheContactInfoCard from '../components/TheContactInfoCard.vue';
</script>

<template>
  <div class="container layout">
    <h1>{{ $t('contact.meta.title') }}</h1>
    <div class="contact-content">
      <TheContactInfoCard/>
      <TheContactForm/>
    </div>
    
  </div>
</template>

<style scoped>
.contact-content {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-l);

  & > * {
    flex: 1
  }
}

@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
  }
}
</style>