<script setup>
import BaseLinkButton from './BaseLinkButton.vue';
import availabilities from '/src/data/availabilities.json' // Fix typo
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const now = ref(new Date())
const available = ref(false)
const almostAvailable = ref(false)
let interval

onMounted(() => {
  checkAvailability() // Check initial state
  interval = setInterval(() => {
    now.value = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Zurich" })
    )
    checkAvailability()
  }, 60 * 1000)
})

onUnmounted(() => clearInterval(interval));

function toMinutes(time) { // Fix: time not times
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function checkAvailability() {
  available.value = false;
  almostAvailable.value = false;
  
  const currentDay = now.value.toLocaleString('en-US', { 
    weekday: 'long', 
    timeZone: 'Europe/Zurich'
  }).toLowerCase()
  
  const slots = availabilities[currentDay] || [];
  const nowMin = now.value.getHours() * 60 + now.value.getMinutes();
  
  for (const { start, end } of slots) {
    const startMin = toMinutes(start);
    const endMin = toMinutes(end);
    
    if (nowMin >= startMin && nowMin <= endMin) {
      available.value = true;
    }
    
    if ((Math.abs(nowMin - startMin) <= 60 || Math.abs(nowMin - endMin) <= 60) && !available.value) {
      almostAvailable.value = true;
    }
  }
}
</script>

<template>
  <section>
    <h2>{{ $t('contact.info.title') }}</h2>
    <address>📍 {{ $t('contact.info.location') }}</address>
    <BaseLinkButton
      link="info@floriansalvi.ch"
      type="mailto"
      :text= "$t('contact.info.mailBtn')"
      src="mail"
      :external="true"
      class="btn"
    />
    <BaseLinkButton
      link="+41792946303"
      type="tel"
      text= "phone"
      src="tel"
      :external="true"
      class="btn"
    />
     <svg
  class="availability-dot"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
  :class="{
    'available': available,
    'soon': almostAvailable && !available,
    'unavailable': !available && !almostAvailable
  }"
>
  <circle cx="8" cy="8" r="8" />
</svg>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  background-color: var(--color-bg-muted);
  padding: var(--spacing-l);
  border-radius: var(--radius-l);
}

.availability-dot circle{
  height: var(--size-dot);
  width: var(--size-dot);
  border-radius: var(--radius-full);
  fill: var(--color-gray);
}

.available circle{
  fill: var(--color-success);
}

.soon circle{
  fill: var(--color-warning);
}

.unavaible circle{
  fill: var(--color-danger);
}
</style>

--color-danger: hsl(0, 70%,57%);
    --color-warning: hsl(30, 95%,64%);
    --color-success: hsl(107,69%,70%);
    --color-info: hsl(209, 70%,60%);