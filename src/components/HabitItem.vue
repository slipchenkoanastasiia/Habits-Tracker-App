<template>
  <div class="habit-item" :class="{ done: habit.doneToday }">
    <font-awesome-icon :icon="['fas', habit.icon]" class="habit-icon" />
    <span>{{ habit.name }}</span>
    <button @click="toggleDone" class="done-btn">
      {{ habit.doneToday ? '✓ Done' : 'Mark as done' }}
    </button>

    <button @click="openSendReportModal" class="send-report-btn">Send Report</button>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>Email the report</h3>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="email-input"
        />
        <div class="modal-buttons">
          <button @click="sendReport" :disabled="loading">
            {{ loading ? 'Відправка...' : 'Відправити' }}
          </button>
          <button @click="closeModal" :disabled="loading">Скасувати</button>
        </div>
        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Habit } from '@/types/Habit'
import { defineEmits } from 'vue'

const props = defineProps<{ habit: Habit }>()
const emit = defineEmits<{
  (e: 'toggle-done', id: string): void
}>()

function toggleDone() {
  emit('toggle-done', props.habit.id)
}

const showModal = ref(false)
const email = ref('')
const message = ref('')
const loading = ref(false)

function openSendReportModal() {
  email.value = ''
  message.value = ''
  showModal.value = true
}

function closeModal() {
  if (!loading.value) {
    showModal.value = false
  }
}

async function sendReport() {
  if (!email.value) {
    message.value = 'Будь ласка, введіть email.'
    return
  }

  loading.value = true
  message.value = ''

  const reportText = `Звіт по звичці "${props.habit.name}":\nСтан на сьогодні: ${
    props.habit.doneToday ? 'Виконано' : 'Не виконано'
  }.`

  try {
    const res = await fetch('http://localhost:5000/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, report: reportText }),
    })

    const data = await res.json()
    if (data.message) {
      message.value = 'Звіт надіслано!'
    } else {
      message.value = 'Помилка: ' + (data.error || 'Невідома помилка')
    }
  } catch (err: any) {
    message.value = 'Помилка запиту: ' + err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.habit-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.habit-icon {
  font-size: 1.5rem;
  color: #555;
}

.done-btn {
  margin-left: auto;
  cursor: pointer;
  background-color: #1e90ff;
  border: none;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.send-report-btn {
  cursor: pointer;
  background-color: #28a745;
  border: none;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.habit-item.done {
  background-color: #d1f0ff;
  text-decoration: line-through;
  color: #555;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 320px;
  max-width: 90%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.email-input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.modal-buttons button {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button:first-child {
  background-color: #28a745;
  color: white;
}

.modal-buttons button:last-child {
  background-color: #ccc;
}

.message {
  margin-top: 1rem;
  color: #333;
}
</style>
