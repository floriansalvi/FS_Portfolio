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
        <img
          :src="project.meta.coverImg"
          :alt="project.meta.title"
          loading="lazy"
        />
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
  background-color: transparent;
  border: var(--border-thin);
  border-color: var(--color-gray);
  border-radius: var(--radius-l);
  overflow: hidden;
}

.img-wrapper {
  position: relative;
  width: 100%;
  padding-top: calc(100% * 2 / 3);
  overflow: hidden;
  flex-shrink: 0;

  & img {
    position: absolute;
    top: 0;
    left: 0;
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