<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

import { localesLabels, locales } from '../i18n';

const { locale, t } = useI18n()
const router = useRouter()
const route = useRoute()

const currentLocale = ref(localStorage.getItem('locale') || 'fr');
locale.value = currentLocale.value;

watch(() => route.params.locale, (newLocale) => {
  if (newLocale && locales.includes(newLocale)) {
    currentLocale.value = newLocale;
    locale.value = newLocale;
    localStorage.setItem('locale', newLocale);
  }
})

function changeLanguage(newLocale) {
  currentLocale.value = newLocale;
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);

  router.push({
    name: route.name,
    params: {...route.params, locale: currentLocale.value },
    query: route.query
  })
}

const availableLanguageOptions = computed(() =>
  locales.map(code => ({
    code,
    label: localesLabels[code] || code
  }))
);

</script>

<template>
  <select :value="currentLocale" @change="changeLanguage($event.target.value)">
    <option
      v-for="lang in availableLanguageOptions"
      :key="lang.code"
      :value="lang.code"
      :lang="lang.code"
    >
      {{ lang.label }}
    </option>
  </select>
</template>

<style scoped>

</style>