<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatYearMonth, formatProjectDate } from '../utils/useDate';
const { locale } = useI18n();

const props = defineProps({
    project: {
      type: Object,
      required: true
    }
})

const formattedDate = computed(() =>
  formatProjectDate(props.project?.meta?.date, locale.value)
);

</script>

<template>
  <li class="project-item">
    <article @click="$router.push({ name: 'ProjectDetail', params: { locale: locale, slug: project.slug } })" class="project-card">
      <div class="img-wrapper">
        <!-- <img
          :src="project.meta.coverImg"
          :alt="project.meta.title"
          loading="lazy"
        /> -->
        <!-- <img
          :src="`${project.meta.coverImg}-800.jpg`"
          :alt="project.meta.title"
          loading="lazy"
        /> -->
        <picture>
          <source
            type="image/avif"
            :srcset="[
              `${project.meta.coverImg}-400.avif 400w`,
              `${project.meta.coverImg}-800.avif 800w`,
              `${project.meta.coverImg}-1200.avif 1200w`,
              `${project.meta.coverImg}-1600.avif 1600w`,
              `${project.meta.coverImg}-2400.avif 2400w`,
              `${project.meta.coverImg}-3200.avif 3200w`
            ].join(', ')"
            sizes=
              "(max-width: 600px) 400px,
              (max-width: 1200px) 800px,
              (max-width: 1800px) 1200px,
              (max-width: 2400px) 1600px,
              (max-width: 3200px) 2400px,
              3200px"
          >
          <source
            type="image/webp"
            :srcset="[
              `${project.meta.coverImg}-400.webp 400w`,
              `${project.meta.coverImg}-800.webp 800w`,
              `${project.meta.coverImg}-1200.webp 1200w`,
              `${project.meta.coverImg}-1600.webp 1600w`,
              `${project.meta.coverImg}-2400.webp 2400w`,
              `${project.meta.coverImg}-3200.webp 3200w`
            ].join(', ')"
            sizes=
              "(max-width: 600px) 400px,
              (max-width: 1200px) 800px,
              (max-width: 1800px) 1200px,
              (max-width: 2400px) 1600px,
              (max-width: 3200px) 2400px,
              3200px"
          >
          <img
            :src="`${project.meta.coverImg}-800.jpg`"
            sizes="(max-width: 600px) 400px,
                  (max-width: 1200px) 800px,
                  (max-width: 1800px) 1200px,
                  (max-width: 2400px) 1600px,
                  (max-width: 3200px) 2400px,
                  3200px"
            :alt="`Projet ${project.meta.title}`"
            loading="lazy"
          >
        </picture>
      </div>
      <div class="txt-wrapper">
        <p class="categories muted">{{ project.meta.categories.join(', ') }}</p>
        <h2>{{ project.meta.title }}</h2>
        <time
          v-if="formattedDate"
          :datetime="formatYearMonth(project.meta.date)"
          class="small"
        >
          {{ formattedDate }}
        </time>
      </div>
    </article>
  </li>
</template>

<style scoped>
.project-item {
  cursor: pointer;
  height: 100%;
}

article {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  height: 100%;
  background-color: var(--color-bg-muted);
  border-radius: var(--radius-l);
  overflow: hidden;
}

.img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: var(--img-ratio-standard);
  overflow: hidden;
  flex-shrink: 0;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    transition: var(--transition-transform);
  }
}

.txt-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: var(--spacing-m);
  padding-inline: var(--spacing-m);
  padding-bottom: var(--spacing-m);
}

.muted {
  color: var(--color-txt-muted);
}

.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  flex-grow: 1;
}

.project-item:hover img{
    transform: scale(1.05);
}
</style>