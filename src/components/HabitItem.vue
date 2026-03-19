<template>
  <div class="habit-item" :class="{ done: habit.doneToday }">
    <font-awesome-icon :icon="['fas', habit.icon]" class="habit-icon" />
    <span>{{ habit.name }}</span>

    <button @click="toggleDone" class="done-btn">
      {{ habit.doneToday ? '✓ Done' : 'Mark as done' }}
    </button>

    <HabitGrid
      :history="habit.history || {}"
      @toggle="toggleDay"
    />

    <button @click="openSendReportModal" class="send-report-btn">
      Send Report
    </button>

    <!-- MODAL -->
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

          <button @click="closeModal" :disabled="loading">
            Скасувати
          </button>
        </div>

        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Habit } from '@/types/Habit'
import HabitGrid from './HabitGrid.vue'

const props = defineProps<{ habit: Habit }>()

const emit = defineEmits<{
  (e: 'toggle-done', id: string): void
}>()

function toggleDone() {
  emit('toggle-done', props.habit.id)
}

function toggleDay(date: string) {
  if (!props.habit.history) {
    props.habit.history = {}
  }

  props.habit.history[date] = !props.habit.history[date]
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

  const reportText = `Звіт по звичці "${props.habit.name}":
Стан на сьогодні: ${props.habit.doneToday ? 'Виконано' : 'Не виконано'}.`

  try {
    console.log('📤 Sending request...')

    const res = await fetch('http://localhost:5000/send-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        report: reportText,
      }),
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()

    console.log('📥 Response:', data)

    if (data.message) {
      message.value = 'Звіт надіслано!'
    } else {
      message.value = 'Помилка: ' + (data.error || 'Невідома помилка')
    }
  } catch (err: any) {
    console.error('❌ Error:', err)
    message.value = 'Помилка запиту: ' + err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

</style>