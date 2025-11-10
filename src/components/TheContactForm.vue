<script setup>
import TheMailIcon from './TheMailIcon.vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
</script>

<template>
  <section>
    <h2>{{ $t('contact.form.title') }}</h2>
    <form action="#" method="POST">
      <div class="names">
        <div>
          <label for="firstname">{{ $t('contact.form.fields.firstname') }}</label>
          <input type="text" id="firstname" name="firstname" autocomplete="given-name" required />
        </div>
        <div>
          <label for="lastname">{{ $t('contact.form.fields.lastname') }}</label>
          <input type="text" id="lastname" name="lastname" autocomplete="family-name" required />
        </div>
      </div>
      <div>
        <label for="email">{{ $t('contact.form.fields.email') }}</label>
        <input type="email" id="email" name="email" autocomplete="email" required />
      </div>
      <div>
        <label for="message">{{ $t('contact.form.fields.message') }}</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      <button type="submit">
        <TheMailIcon/>
        {{ $t('contact.form.send') }}
      </button>
    </form>
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

form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
}

form div {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.names {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-l);
  flex-wrap: wrap;

  & > div {
    flex-grow: 1;
  }
}

label {
  color: var(--color-txt-muted);
}

input, textarea {
  border: var(--border-thin);
  border-color: var(--color-gray);
  padding-inline: var(--spacing-s);
  padding-block: var(--spacing-xs);
  border-radius: var(--radius-s);
}

textarea {
  resize:none;
}

input:focus, textarea:focus {
  outline: var(--border-thick);
}

button {
  width: 100%;
  height: var(--size-btn);
  background-color: var(--color-accent);
  color: var(--color-txt-accent);
  border-radius: var(--radius-s);
  border: var(--border-thin);
  padding-inline: var(--spacing-s);
  cursor: pointer;
  transition:
    color var(--transition-duration) var(--transition-timing),
    background-color var(--transition-duration) var(--transition-timing),
    border-color var(--transition-duration) var(--transition-timing);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

button:hover{
  background-color: transparent;
  color: var(--color-txt);
  border-color: var(--color-txt);
}

</style>