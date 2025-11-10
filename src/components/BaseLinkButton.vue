<script setup>
import { computed } from 'vue';
import TheGithubIcon from './TheGithubIcon.vue';
import TheLiveIcon from './TheLiveIcon.vue';
import TheMailIcon from './TheMailIcon.vue';

const props = defineProps({
    link: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      default: 'link',
      validator: value => ['link', 'mailto', 'tel'].includes(value)
    },
    text: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true,
      validator: value => ['github', 'live', 'mail'].includes(value)
    },
    external: {
      type: Boolean,
      required: true,
      default: false
    },
    negative: {
      type: Boolean,
      required: false,
      default: false
    }
});

const href = props.type === 'mailto' ? `mailto:${props.link}` : (props.type === 'tel' ? `tel:${props.link}`: props.link);
const target = props.external ? '_blank' : '_self';
const rel = props.external ? 'noopener noreferrer' : null;

const icons = {
  github: TheGithubIcon,
  live: TheLiveIcon,
  mail: TheMailIcon
};

const icon = computed(() => icons[props.src]);
</script>

<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
    class="link-button"
    :class="negative ? 'negative' : ''"
  >
    <component :is="icon" />
    {{ text }}
  </a>
</template>

<style scoped>
a {
  height: var(--size-btn);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  text-decoration: none;
  background-color: var(--color-accent);
  color: var(--color-txt-accent);
  border-radius: var(--radius-s);
  border: var(--border-thin);
  padding-inline: var(--spacing-s);
  transition:
    color var(--transition-duration) var(--transition-timing),
    background-color var(--transition-duration) var(--transition-timing),
    border-color var(--transition-duration) var(--transition-timing);
}

a img {
  width: var(--size-icon);
  height: var(--size-icon);
}

a:hover{
  background-color: transparent;
  color: var(--color-txt);
  border-color: var(--color-txt);
}

.negative {
  background-color: var(--color-txt-accent);
  color: var(--color-accent);
  border-color: var(--color-txt-accent);
}

.negative:hover {
  background-color: transparent;
  color: var(--color-txt-accent);
  border-color: var(--color-txt-accent);
}
</style>