<script setup>
import { ref, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import BaseBanner from '../components/BaseBanner.vue';
import { formatYearMonth, formatProjectDate } from '../utils/useDate';

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

const projectSlug = route.params.slug;
const project = ref(null);

const projectsFiles = import.meta.glob('/src/data/projects.*.json');

watchEffect(async () => {
  const currentLocale = (locale.value && typeof locale.value === 'string') ? locale.value : 'fr';
  const path = `/src/data/projects.${currentLocale}.json`;

  let projectsData = [];
  try {
    if (projectsFiles[path]) {
      projectsData = (await projectsFiles[path]()).default;
    } else if (projectsFiles['/src/data/projects.fr.json']) {
      projectsData = (await projectsFiles['/src/data/projects.fr.json']()).default;
    } else {
      console.error('Impossible de charger les projets JSON');
    }
  } catch (e) {
    console.error('Erreur lors du chargement du JSON', e);
  }

  const found = projectsData.find(p => p.slug === projectSlug);
  if (!found) {
  // Redirige vers la 404 locale
  router.replace(`/${locale.value}/404/`);
  return;
}

  project.value = found;
});

const formattedDate = computed(() =>
  formatProjectDate(project.value?.meta?.date, locale.value)
);

</script>

<template>
  <div v-if="project" class="container">
    <div class="layout">
      <h1>{{ project.meta.title }}</h1>
      <img :src="project.meta.coverImg" :alt="project.meta.title" />
      <div class="introduction">
        <div>
          <h2 class="muted">{{ $t('projects.details.description') }}</h2>
          <p v-html="project.intro?.text?.replace(/\n/g, '<br>')"></p>
        </div>
        <ul>
          <li v-if="project.meta.date">
            <p class="muted">{{ $t('projects.details.completion') }}</p>
            <h3>
              <time :datetime="formatYearMonth(project.meta.date)">
                {{ formattedDate }}
              </time>
            </h3>
          </li v-if="project.meta.categories && project.meta.categories.length">
          <li>
            <p class="muted">{{ $t('projects.details.categories') }}</p>
            <h3>{{ project.meta.categories.join(', ') }}</h3>
          </li>
          <li v-if="project.technologies && project.technologies.length">
            <p class="muted">{{ $t('projects.details.technologies') }}</p>
            <h3>{{ project.technologies.join(', ') }}</h3>
          </li>
        </ul>
      </div>
    </div>

    
    <div v-for="section in project.sections" :key="section.title" class="project-section">
      <div class="layout">
        <h2 class="muted">{{ section.title }}</h2>
        <p v-html="section.text.replace(/\n/g, '<br>')"></p>
      </div>
      <div v-if="section.images.length" class="images-grid">
        <img
          v-for="img in section.images"
          :key="img.img"
          :src="img.img"
          :alt="img.imgAlt"
          :class="`priority-${img.priority}`"
          loading="lazy"
        />
      </div>
    </div>
  </div>
  <BaseBanner/>
</template>

<style scoped>
.introduction {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-xl);

  & > * {
    flex: 2;
  }

  & > ul {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);

    & > * {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }
  }
}

.images-grid {
  display: grid;
  gap: var(--spacing-l);
}

img {
  border-radius: var(--radius-m);
}

/* Les images priorité 1 occupent toute la largeur */
.priority-1 {
  grid-column: 1 / -1;
  width: 100%;
  object-fit: cover;
}

/* Les images priorité 2 occupent deux par ligne */
.priority-2 {
  width: 100%;
  object-fit: cover;
}

/* Grille responsive */
@media (min-width: 769px) {
  .images-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Sur mobile, toutes les images s'affichent en colonne */
@media (max-width: 768px) {
  .images-grid {
    grid-template-columns: 1fr;
  }
}


</style>