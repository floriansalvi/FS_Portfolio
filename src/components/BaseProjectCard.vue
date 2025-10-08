<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();

const props = defineProps({
    project: {
      type: Object,
      required: true
    }
})

const formattedDate = computed(() => {
    if (!props.project?.meta?.date) return '';
    const date = new Date(props.project.meta.date);
    return new Intl.DateTimeFormat(locale.value, { month: 'long', year: 'numeric' }).format(date);
});

</script>

<template>
  <li class="project-item">
    <article @click="$router.push({ name: 'ProjectDetail', params: { locale: locale, slug: project.slug } })" class="project-card">
      <div class="img-wrapper">
        <img :src="project.meta.coverImg" :alt="project.meta.title"></img>
      </div>
      <p class="categories muted">{{ project.meta.categories.join(', ') }}</p>
      <h3>{{ project.meta.title }}</h3>
      <p class="description muted">{{ project.meta.description }}</p>
      <span v-if="formattedDate" class="small">{{ formattedDate }}</span>
    </article>
  </li>
</template>

<style scoped>
.project-item {
  background-color: transparent;
  border: var(--border-thick);
  border-color: var(--color-txt-muted);
  /* background-color: var(--color-bg-muted); */
  padding: var(--spacing-s);
  border-radius: var(--radius-l);
  cursor: pointer;
  height: 100%;
  transition: var(--transition-shadow);
}

article {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  height: 100%;
}

.img-wrapper {
  position: relative;
  width: 100%;
  padding-top: calc(100% * 2 / 3);
  overflow: hidden;
  border-radius: var(--radius-m);
  flex-shrink: 0;
}

.img-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.project-item:hover {

  & img {
    transform: scale(1.05);
    transition: var(--transition-transform);
  }
}
</style>