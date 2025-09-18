<script setup>
import { RouterView } from 'vue-router';
import { useSeoLang } from './composables/useSeoLang';
import { locales } from './i18n';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

const baseUrl = window.location.origin

useSeoLang(locales, baseUrl)
</script>

<template>
  <TheHeader/>
  <main>
    <router-view/>
  </main>
  <TheFooter/>
</template>
