<template>
  <div class="habit-item" :class="{ done: habit.doneToday }">
    <font-awesome-icon :icon="['fas', habit.icon]" class="habit-icon" />
    <span>{{ habit.name }}</span>

    <button @click="toggleDone" class="done-btn">
      {{ habit.doneToday ? '✓ Done' : 'Mark as done' }}
    </button>

    <HabitGrid
      :history="historySafe"
      @toggle="toggleDay"
    />

    <button @click="openSendReportModal" class="send-report-btn">
      Send Report
    </button>

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
import { ref, computed } from 'vue'
import type { Habit } from '@/types/Habit'
import HabitGrid from './HabitGrid.vue'
import { sendReport as sendReportApi } from '@/api/email'

const props = defineProps<{ habit: Habit }>()

const historySafe = computed(() => props.habit.history || {})

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
  if (loading.value) return

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.value) {
    message.value = 'Будь ласка, введіть email.'
    return
  }

  if (!emailRegex.test(email.value)) {
    message.value = 'Некоректний email.'
    return
  }

  loading.value = true
  message.value = ''

const reportText = `Habit Report

Habit: ${props.habit.name}
Status for today: ${props.habit.doneToday ? 'Completed ✅' : 'Not completed ❌'}`

  try {
const data = await sendReportApi(email.value, reportText)

    if (data.success) {
      message.value = 'Звіт надіслано!'
      email.value = ''

      setTimeout(() => {
        showModal.value = false
      }, 1000)
    } else {
      message.value = data.error || 'Помилка'
    }

  } catch (err: any) {
    console.error('❌ Error:', err)
    message.value = err.message || 'Невідома помилка'
  } finally {
    loading.value = false
  }
}
</script>