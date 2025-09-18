<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const fullUrl = computed(() => `${window.location.origin}${route.fullPath}`);

// Correctement initialisé
const { t } = useI18n();
</script>

<template>
  <div>
    <h1>404 - {{ t('notFound.title') }}</h1>
    <p>
      L'URL <strong>{{ fullUrl }}</strong> n'existe pas
    </p>
    <a href="/">{{ t('notFound.backToHomeLink') }}</a>
  </div>
</template>

