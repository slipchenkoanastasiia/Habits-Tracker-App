<template>
  <form @submit.prevent="submitReport">
    <label for="email">Email:</label>
    <input v-model="email" id="email" type="email" required />

    <label for="report">Звіт:</label>
    <textarea v-model="report" id="report" required></textarea>

    <button type="submit" :disabled="isLoading">Відправити</button>
  </form>

  <p v-if="message" :class="messageType">{{ message }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const report = ref('');
const isLoading = ref(false);
const message = ref('');
const messageType = ref('');

const submitReport = async () => {
  isLoading.value = true;
  message.value = '';
  messageType.value = '';

  try {
    const response = await fetch('http://localhost:5000/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        report: report.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      message.value = data.message;
      messageType.value = 'success';
    } else {
      message.value = data.error || 'Помилка сервера';
      messageType.value = 'error';
    }
  } catch (error) {
    message.value = 'Помилка з\'єднання';
    messageType.value = 'error';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.success {
  color: green;
}
.error {
  color: red;
}
</style>
