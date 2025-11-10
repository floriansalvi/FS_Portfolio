<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();
</script>

<template>
    <button @click="$router.back()">
        {{ $t('global.backButton.label') }}
    </button>
</template>

<style scoped>
button {
    height: var(--size-btn);
    width: fit-content;
    color: var(--color-txt-muted);
    font-size: var(--font-size-p);
}

button:hover {
    color: var(--color-txt);
}   
</style>