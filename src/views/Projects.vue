<script setup>
import { ref, watchEffect, computed } from 'vue';
import BaseProjectCard from '../components/BaseProjectCard.vue';
import BaseBanner from '../components/BaseBanner.vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const projects = ref([]);

const projectsFiles = import.meta.glob('/src/data/projects.*.json');

watchEffect(async () => {
    const path = `/src/data/projects.${locale.value}.json`;

    if(projectsFiles[path]) {
        projects.value = (await projectsFiles[path]()).default;
    } else {
        projects.value = (await projectsFiles['@/data/projects.fr.json']()).default
    }
})

const sortedProjects = computed(() => {
  return [...projects.value].sort((a, b) => {
    const dateA = new Date(a.meta?.date || 0);
    const dateB = new Date(b.meta?.date || 0);
    return dateB - dateA; // Ordre décroissant (plus récent en premier)
  });
});

</script>

<template>
  <div class="container layout">
    <h2>{{ $t('projects.meta.title') }}</h2>
    <ul class="grid-m">
        <BaseProjectCard
            v-for="project in sortedProjects"
            :key="project.slug"
            :project=project
        />
    </ul>
  </div>
  <BaseBanner/>
</template>

<style scoped>

</style>