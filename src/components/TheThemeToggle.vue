<script setup>
import { ref, onMounted , watch, computed} from 'vue';

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
    <svg v-if="theme === 'light'" width="16" height="16" viewBox="0 0 417 417" fill="currentColor">
    <rect id="Sun" x="0" y="0" width="416.667" height="416.667" style="fill:none;"/>
    <g id="Sun1" serif:id="Sun">
        <g transform="matrix(0.5,-0.5,0.5,0.5,7.30741e-14,208.333)">
            <path d="M-4.315,126.354C-1.552,123.591 0,119.844 0,115.937L-0,14.731C0,6.595 6.595,0 14.731,-0L115.937,-0C119.844,0 123.591,-1.552 126.354,-4.315L197.917,-75.878C203.67,-81.631 212.997,-81.631 218.75,-75.878L290.313,-4.315C293.076,-1.552 296.823,0 300.73,0L401.935,-0C410.071,0 416.667,6.595 416.667,14.731L416.667,115.937C416.667,119.844 418.219,123.591 420.981,126.354L492.545,197.917C498.297,203.67 498.297,212.997 492.545,218.75L420.981,290.313C418.219,293.076 416.667,296.823 416.667,300.73L416.667,401.935C416.667,410.071 410.071,416.667 401.935,416.667L300.73,416.667C296.823,416.667 293.076,418.219 290.313,420.981L218.75,492.545C212.997,498.297 203.67,498.297 197.917,492.545L126.354,420.981C123.591,418.219 119.844,416.667 115.937,416.667L14.731,416.667C6.595,416.667 0,410.071 0,401.935L0,300.73C0,296.823 -1.552,293.076 -4.315,290.313L-75.878,218.75C-81.631,212.997 -81.631,203.67 -75.878,197.917L-4.315,126.354ZM333.333,83.333C264.344,14.344 152.323,14.344 83.333,83.333C14.344,152.323 14.344,264.344 83.333,333.333C152.323,402.323 264.344,402.323 333.333,333.333C402.323,264.344 402.323,152.323 333.333,83.333ZM314.583,102.083C373.224,160.724 373.224,255.942 314.583,314.583C255.942,373.224 160.724,373.224 102.083,314.583C43.442,255.942 43.442,160.724 102.083,102.083C160.724,43.442 255.942,43.442 314.583,102.083Z"/>
        </g>
    </g>
    </svg>

    <svg v-else width="16" height="16" viewBox="0 0 417 417" fill="currentColor">
        <g transform="matrix(1,0,0,1,-458,0)">
            <g id="Moon" transform="matrix(1,0,0,1,458.333,0)">
                <rect x="0" y="0" width="416.667" height="416.667" style="fill:none;"/>
                <clipPath id="_clip1">
                    <rect x="0" y="0" width="416.667" height="416.667"/>
                </clipPath>
                <g clip-path="url(#_clip1)">
                    <g transform="matrix(1.42111,0,0,1.38316,-712.903,-42.3232)">
                        <path d="M787.854,159.592C788.35,158.341 789.599,157.587 790.904,157.752C792.208,157.916 793.244,158.958 793.43,160.295C794.372,167.133 794.851,174.119 794.851,181.22C794.851,264.35 729.162,331.841 648.252,331.841C567.342,331.841 501.653,264.35 501.653,181.22C501.653,98.09 567.342,30.599 648.252,30.599C655.163,30.599 661.963,31.091 668.621,32.044C669.928,32.237 670.947,33.306 671.108,34.653C671.269,35.999 670.531,37.29 669.309,37.802C636.631,51.854 613.655,85.033 613.655,123.683C613.655,175.057 654.251,216.767 704.253,216.767C741.871,216.767 774.164,193.16 787.854,159.592Z"/>
                    </g>
                </g>
            </g>
        </g>
    </svg>
  </button>
</template>

<style scoped>
button {
    color: var(--color-txt);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 9999px;
    transition: background-color 0.2s ease, transform 0.2s ease;
    cursor: pointer;

    & svg {
        height: 1rem;
        width: 1rem;
    }
}

button:hover {
  transform: scale(1.1);
}

button img {
  width: 1.5rem; /* taille SVG */
  height: 1.5rem;
  transition: filter 0.2s ease;
}

/* Exemple pour recolorer le SVG si c’est un SVG inline avec fill actuel */
/* Si tes SVG sont des images externes, il faudra les recolorer via un <svg> inline ou filter */
button img.dark-icon {
  filter: brightness(0) invert(1); /* ex: lune blanche sur fond sombre */
}

</style>