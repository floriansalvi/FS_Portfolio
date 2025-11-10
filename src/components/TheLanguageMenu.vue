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
  <div class="select-wrapper">
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
  </div>
</template>

<style scoped>

.select-wrapper {
  position: relative;
  display: inline-block;
}

.select-wrapper select {
  width: fit-content;
  max-width: 100%;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: inline-block;
  height: var(--size-btn);

  background-color: transparent;
  border: var(--border-thin);
  border-color: var(--color-txt);
  border-radius: var(--radius-s);

  padding-inline: var(--spacing-s);
  padding-right: calc(var(--spacing-s) * 2 + 1rem);

  cursor: pointer;
  font-size: var(--font-size-p);
  color: var(--color-txt);

  transition: var(--transition-background-color), var(--transition-border-color);
}

.select-wrapper::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);

  width: 1rem;
  height: 1rem;

  -webkit-mask: url("/images/icons/drop-icon.svg") no-repeat center;
  mask: url("/images/icons/drop-icon.svg") no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;

  background-color: var(--color-txt);
  pointer-events: none;
}

.select-wrapper:hover select {
  border-color: var(--color-accent);
  background-color: var(--color-accent);
  color: var(--color-txt-accent);
}

.select-wrapper:hover::after {
  background-color: var(--color-txt-accent);
}

.select-wrapper select:focus {
  outline: none;
}

.select-wrapper select option {
  background-color: var(--color-bg);
  color: var(--color-txt);
  padding-inline: var(--spacing-s);
}

.select-wrapper select option:hover {
  background-color: var(--color-accent);
  color: var(--color-txt-accent);
}

</style>