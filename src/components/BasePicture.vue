<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    path: {
      type: String,
      required: true
    },
    altTxt: {
      type: String,
      required: true
    },
    ratio: {
      type: String,
      required: true,
      default: '16/9'
    },
    zoomable: {
      type: Boolean,
      required: false,
      default: false
    },
    pointer: {
      type: Boolean,
      required: false,
      default: false
    }
})

const isDeviceMobile = ref(window.innerWidth <= 768);

const isZoomed = ref(false);

const handleResize = () => {
    isDeviceMobile.value = window.innerWidth <= 768;
}

const toggleZoom = () => {
    if (!props.zoomable) return;

    if(!isDeviceMobile.value) {
    isZoomed.value = !isZoomed.value;
    } else {
        return;
    }
}

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <div
        :class="`img-wrapper ${$attrs.class}`"
        :style="{
            aspectRatio: ratio,
            cursor: zoomable ? 'zoom-in' : (pointer ? 'pointer' : 'default') 
        }"
        @click="toggleZoom"
    >
        <picture>
            <source
                type="image/avif"
                :srcset="[
                `${path}-400.avif 400w`,
                `${path}-800.avif 800w`,
                `${path}-1200.avif 1200w`,
                `${path}-1600.avif 1600w`,
                `${path}-2400.avif 2400w`,
                `${path}-3200.avif 3200w`
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
                `${path}-400.webp 400w`,
                `${path}-800.webp 800w`,
                `${path}-1200.webp 1200w`,
                `${path}-1600.webp 1600w`,
                `${path}-2400.webp 2400w`,
                `${path}-3200.webp 3200w`
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
                :src="`${path}-800.jpg`"
                sizes="(max-width: 600px) 400px,
                    (max-width: 1200px) 800px,
                    (max-width: 1800px) 1200px,
                    (max-width: 2400px) 1600px,
                    (max-width: 3200px) 2400px,
                    3200px"
                :alt="`${altTxt}`"
                loading="lazy"
            >
        </picture>
    </div>
    <teleport to="body">
        <div
            v-if="isZoomed"
            class="zoom-overlay"
            @click="toggleZoom"
        >
            <picture>
                <source
                    type="image/avif"
                    :srcset="[
                    `${path}-400.avif 400w`,
                    `${path}-800.avif 800w`,
                    `${path}-1200.avif 1200w`,
                    `${path}-1600.avif 1600w`,
                    `${path}-2400.avif 2400w`,
                    `${path}-3200.avif 3200w`
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
                    `${path}-400.webp 400w`,
                    `${path}-800.webp 800w`,
                    `${path}-1200.webp 1200w`,
                    `${path}-1600.webp 1600w`,
                    `${path}-2400.webp 2400w`,
                    `${path}-3200.webp 3200w`
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
                    :src="`${path}-800.jpg`"
                    sizes="(max-width: 600px) 400px,
                        (max-width: 1200px) 800px,
                        (max-width: 1800px) 1200px,
                        (max-width: 2400px) 1600px,
                        (max-width: 3200px) 2400px,
                        3200px"
                    :alt="`${altTxt}`"
                    loading="lazy"
                >
            </picture>
        </div>
    </teleport>
</template>

<style scoped>

.img-wrapper {
  width: 100%; /* la grille décide de la largeur */
  overflow: hidden;
  border-radius: var(--radius-l);
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: var(--transition-transform);
}
.zoom-overlay {
    position: fixed;
    inset: 0;
    background-color: color-mix(in hsl, var(--color-bg), transparent 25%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-index-tooltip);
    cursor: zoom-out;
    animation: fadeIn .2s ease-out;

    & img {
        width: 100%;
        max-width: var(--size-container);
        border-radius: var(--radius-l);
        object-fit: contain;
        transform: .2s ease;
        border-radius: inherit;
    }
}

.priority-1 {
  grid-column: 1 / -1;
}

.priority-2 {
  grid-column: auto;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>