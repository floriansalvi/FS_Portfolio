<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatYearMonth, formatProjectDate } from '../utils/useDate';
import BasePicture from './BasePicture.vue';

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
      <BasePicture
        :path="project.meta.coverImg"
        :altTxt="project.meta.title"
        ratio="3/2"
        pointer=true
      />
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

.project-item:hover :deep(.img-wrapper img) {
    transform: scale(1.05);
}
</style>