<script setup>
import { ref } from 'vue';

const form = ref({name: '', email: '', message: ''});
const status = ref('');

const sendMessage = async () => {
    status.value = '';

    if (!form.value.name || !form.value.email || !form.value.message) {
        status.value = "To implement";
        return;
    }

    try {
        const res = await fetch("/contact.php", {
        method: "POST",
        body: new URLSearchParams(form.value),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        if (res.ok) {
        status.value = "To implement";
        form.value = { name: "", email: "", message: "" };
        } else {
        status.value = `To implement`;
        }
    } catch (err) {
        console.error(err);
        status.value = "To implement";
    }
}
</script>

<template>
  <div>
    <h2>Contactez-moi</h2>
    <form @submit.prevent="sendMessage">
      <input
        v-model="form.name"
        type="text"
        placeholder="Nom"
        required
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        required
      />
      <textarea
        v-model="form.message"
        placeholder="Votre message"
        required
      ></textarea>

      <button
        type="submit"
      >
        Send
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>