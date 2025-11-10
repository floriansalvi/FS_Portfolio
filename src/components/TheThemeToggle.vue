<script setup>
import { ref, onMounted , watch, computed} from 'vue';
import TheMoonIcon from './TheMoonIcon.vue';
import TheSunIcon from './TheSunIcon.vue';

const mode = ref('auto');
const userTheme = ref('light');

const getThemeByTime = () => {
    const hour = new Date().getHours();
    return hour >=22 || hour < 7 ? 'dark' : 'light';
}

const theme = computed(() => {
    return mode.value === 'manual' ? userTheme.value : getThemeByTime();
})

const applyTheme = (newTheme) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
}

watch(theme, (newTheme) => {
    applyTheme(newTheme);
});

const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    mode.value = 'manual';
    userTheme.value = newTheme;
    localStorage.setItem('theme-mode', 'manual');
    localStorage.setItem('theme', newTheme);
}

onMounted(() => {
    const savedMode = localStorage.getItem('theme-mode');
    const savedTheme = localStorage.getItem('theme');

    if (savedMode === 'manual' && savedTheme) {
        mode.value = 'manual';
        userTheme.value = savedTheme;
    } else {
        mode.value = 'auto';
    }

    applyTheme(theme.value);

    if (mode.value === 'auto') {
        setInterval(() => {
            applyTheme(getThemeByTime());
        }, 60 * 1000);
    }
})

</script>

<template>
  <button
    @click="toggleTheme"
    :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
  >
    <TheSunIcon v-if="theme === 'light'" />
    <TheMoonIcon v-else />
  </button>
</template>

<style scoped>
button {
    height: var(--size-btn);
    width: var(--size-btn);
    color: var(--color-txt);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: var(--radius-s);
    transition: background-color 0.2s ease, transform 0.2s ease;
    cursor: pointer;

    & svg {
        height: var(--size-icon);
        width: var(--size-icon);
    }
}

button:hover svg {
    transform: scale(1.1);
}

button svg {
  width: 1.25rem; /* taille SVG */
  height: 1.25rem;
  transition: transform 0.2s ease;
}
</style>