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
  <select
    v-model="currentLocale"
    @change="changeLanguage($event.target.value)"
    :aria-label="t('global.header.languageSelectAlt')"
  >
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
select {
  appearance: none; /* enlève le style par défaut (Firefox/Chrome) */
  -webkit-appearance: none; /* Safari */
  -moz-appearance: none; /* Firefox ancien */

  background-color: var(--color-bg-muted);
  border: var(--border-thick);
  border-color: transparent;
  border-radius: 8px;
  padding: 0.5rem 2.5rem 0.5rem 1rem; /* padding à droite pour la flèche */
  font-size: 1rem;
  color: var(--color-txt-muted);
  cursor: pointer;
}

select:focus {
  outline: none;
}

select:hover {
  border: var(--border-thick);
}

/* Ajouter une flèche custom */
select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

select option {
  background-color: var(--color-bg);
  color: var(--color-txt);
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

/* survol d’une option (pas tous les navigateurs le gèrent) */
select option:hover {
  background-color: var(--color-accent-light);
  color: var(--color-txt);
}

/* option sélectionnée */
select option:checked {
  background-color: var(--color-accent);
  color: #fff;
}

</style>