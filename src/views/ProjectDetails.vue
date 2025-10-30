<script setup>
import { ref, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import BaseBanner from '../components/BaseBanner.vue';
import BaseLinkButton from '../components/BaseLinkButton.vue';
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
  <div v-if="project" class="container layout">
    <h1>{{ project.meta.title }}</h1>
    <img :src="project.meta.coverImg" :alt="project.meta.title" />
    <div class="layout introduction">
      <div class="wrapper description">
        <h2 class="muted">{{ $t('projects.details.description') }}</h2>
        <p v-html="project.intro?.text?.replace(/\n/g, '<br>')"></p>
      </div>
      <div class="wrapper info">
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
        <div class="links">
          <BaseLinkButton
            v-if="project.links.github"
            :link="project.links.github"
            type="link"
            :text="$t('projects.details.github')"
            src="github"
            :external="true"
          />
          <BaseLinkButton
            v-if="project.links.live"
            :link="project.links.live"
            type="link"
            :text="$t('projects.details.live')"
            src="live"
            :external="true"
          />
        </div>
      </div>
    </div>
    <img
          v-if="project.intro?.images?.length"
          v-for="img in project.intro.images"
          :key="img.img"
          :src="img.img"
          :alt="img.imgAlt"
          loading="lazy"
        />
    <div v-for="section in project.sections" :key="section.title" class="project-section layout">
      <div class="wrapper">
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
    <BaseBanner/>
  </div>
</template>

<style scoped>
.introduction {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-l);

  & .description {
    flex: 2;
  }

  & .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);

    & ul {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
    }

    & .links {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      gap: var(--spacing-m);
    }
  }
}

.images-grid {
  display: grid;
  gap: var(--spacing-l);
}

img {
  border-radius: var(--radius-l);
  aspect-ratio: var(--img-ratio-wide);
  object-fit: cover;
}
.priority-1 {
  grid-column: 1 / -1;
  width: 100%;
  object-fit: cover;
}

.priority-2 {
  width: 100%;
  object-fit: cover;
}

@media (min-width: 769px) {
  .images-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .images-grid {
    grid-template-columns: 1fr;
  }

  .introduction {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--spacing-l);
  }

  .links > * {
    flex-grow: 1;
    justify-content: center;
  }
}


</style>

<!-- <img
          v-if="project.intro?.images?.length"
          v-for="img in project.intro.images"
          :key="img.img"
          :src="img.img"
          :alt="img.imgAlt"
          loading="lazy"
        /> -->