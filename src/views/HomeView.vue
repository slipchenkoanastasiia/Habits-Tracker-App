<template>
  <div class="container">
    <h1 class="title">Habits Tracker App</h1>

    <div class="tabs">
      <button :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">All</button>
      <button :class="{ active: activeTab === 'physical' }" @click="activeTab = 'physical'">Physical</button>
      <button :class="{ active: activeTab === 'mental' }" @click="activeTab = 'mental'">Mental</button>
    </div>

    <div class="week-nav">
      <button @click="prevWeek">&lt;</button>
      <span>{{ weekRange }}</span>
      <button @click="nextWeek">&gt;</button>
    </div>

    <div class="add-habit">
      <input v-model="newHabitName" placeholder="New habit" />
      <select v-model="newHabitType">
        <option value="physical">Physical</option>
        <option value="mental">Mental</option>
      </select>
      <button @click="addHabit">Add</button>
    </div>

    <draggable
      v-model="habits"
      item-key="id"
      class="habit-list"
      ghost-class="ghost"
      animation="200"
    >
      <template #item="{ element }">
        <HabitItem
          :habit="element"
          @toggle-done="toggleDone"
          @delete-habit="deleteHabit"
        />
      </template>
    </draggable>

    <div class="actions">
      <button class="secondary" @click="goToMonthly">Monthly Overview</button>
      <button class="primary" @click="openModal">Send Weekly Report</button>
    </div>
  </div>

  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h3 class="modal-title">Send Weekly Report</h3>

      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="modal-input"
      />

      <div class="modal-buttons">
        <button class="send-btn" @click="sendReport" :disabled="loading">
          {{ loading ? 'Sending...' : 'Send' }}
        </button>
        <button class="cancel-btn" @click="closeModal">Cancel</button>
      </div>

      <p v-if="message" class="modal-message">{{ message }}</p>
    </div>
  </div>

  <div v-if="showDeleteModal" class="modal-overlay" @click.self="cancelDelete">
    <div class="modal">
      <h3 class="modal-title">Delete Habit</h3>
      <p class="modal-message">Are you sure you want to delete this habit?</p>
      <div class="modal-buttons">
        <button class="cancel-btn" @click="cancelDelete">Cancel</button>
        <button class="delete-confirm-btn" @click="confirmDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Habit, HabitType } from '@/types/Habit'
import { defaultHabits } from '@/data/defaultHabits'
import HabitItem from '@/components/HabitItem.vue'
import { v4 as uuidv4 } from 'uuid'
import draggable from 'vuedraggable'
import { generateWeeklyReportHTML } from '@/utils/generateReportHTML'

const STORAGE_KEY = 'habits-tracker-data'

const newHabitName = ref<string>('')
const newHabitType = ref<HabitType>('physical')
const habits = ref<Habit[]>([])
const activeTab = ref<'all' | HabitType>('all')
const currentDate = ref(new Date())

const showModal = ref(false)
const email = ref('')
const message = ref('')
const loading = ref(false)

const router = useRouter()

const showDeleteModal = ref(false)
const habitToDelete = ref<string | null>(null)

function deleteHabit(id: string) {
  habitToDelete.value = id
  showDeleteModal.value = true
}

function confirmDelete() {
  if (!habitToDelete.value) return
  habits.value = habits.value.filter(h => h.id !== habitToDelete.value)
  showDeleteModal.value = false
  habitToDelete.value = null
}

function cancelDelete() {
  showDeleteModal.value = false
  habitToDelete.value = null
}

function openModal() {
  showModal.value = true
  email.value = ''
  message.value = ''
}

function closeModal() {
  showModal.value = false
}

function addHabit() {
  const name = newHabitName.value.trim()
  if (!name) return
  const newHabit: Habit = {
    id: uuidv4(),
    name,
    type: newHabitType.value,
    icon: 'star',
    doneToday: false,
    history: {}
  }
  habits.value.push(newHabit)
  newHabitName.value = ''
  newHabitType.value = 'physical'
}

function goToMonthly() {
  router.push('/monthly')
}

function getLocalDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      habits.value = JSON.parse(saved)
    } catch {
      habits.value = defaultHabits.map(h => ({ ...h }))
    }
  } else {
    habits.value = defaultHabits.map(h => ({ ...h }))
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal()
  })
})

watch(habits, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

watch(email, (v) => {
  localStorage.setItem('habits-tracker-email', v)
})

function toggleDone(id: string) {
  const habit = habits.value.find(h => h.id === id)
  if (!habit) return
  const today = getLocalDate(new Date())
  habit.history = habit.history || {}
  habit.history[today] = !habit.history[today]
  habit.doneToday = habit.history[today]
}

const filteredHabits = computed(() => {
  if (activeTab.value === 'all') return habits.value
  return habits.value.filter(h => h.type === activeTab.value)
})

const weekRange = computed(() => {
  const date = new Date(currentDate.value)
  const day = date.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day
  const monday = new Date(date)
  monday.setDate(date.getDate() + diffToMonday)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return `${monday.toLocaleDateString('en-US', options)} - ${sunday.toLocaleDateString('en-US', options)}`
})

function prevWeek() {
  currentDate.value = new Date(currentDate.value.getTime() - 7 * 86400000)
}

function nextWeek() {
  currentDate.value = new Date(currentDate.value.getTime() + 7 * 86400000)
}

async function sendReport() {
  if (!email.value.trim()) {
    message.value = 'Enter email'
    return
  }

  loading.value = true
  message.value = ''

  try {
    const html = generateWeeklyReportHTML(email.value, habits.value)

    if (!html || typeof html !== 'string') {
      message.value = 'Report HTML is empty'
      loading.value = false
      return
    }

    const res = await fetch('http://localhost:5001/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, reportHTML: html })
    })

    const data = await res.json()
    message.value = res.ok ? 'Sent successfully ✅' : data.error || 'Error'
    if (res.ok) setTimeout(closeModal, 1000)
  } catch (err) {
    console.error('Send report error:', err)
    message.value = 'Connection error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 420px;
  margin: 0 auto;
  padding: 16px;
  min-height: 100vh;
  padding-bottom: 80px;
}

.title {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;

  color: #94a3b8;

  text-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
}

.tabs {
  display: flex;
  background: rgba(30, 41, 59, 0.6);
  border-radius: 14px;
  padding: 4px;
  margin-bottom: 16px;

  backdrop-filter: blur(10px);
}

.tabs button {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tabs button.active {
  background: #22c55e;
  color: black;
  font-weight: 600;

  box-shadow: 0 0 12px rgba(34, 197, 94, 0.6);
}

.week-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: rgba(30, 41, 59, 0.6);
  padding: 10px 14px;
  border-radius: 14px;

  margin-bottom: 18px;

  backdrop-filter: blur(10px);
}

.week-nav button {
  background: transparent;
  border: none;
  color: #22c55e;
  font-size: 18px;
  cursor: pointer;

  transition: transform 0.2s ease;
}

.week-nav button:active {
  transform: scale(0.9);
}

.week-nav span {
  font-size: 14px;
  font-weight: 500;
}

.habit-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.actions {
  position: sticky;
  bottom: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding-top: 12px;

}

.primary {
  background: linear-gradient(135deg, #22c55e, #4ade80);
  color: black;
  padding: 14px;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;

  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
  transition: all 0.2s ease;
}

.primary:active {
  transform: scale(0.96);
  box-shadow: 0 3px 10px rgba(34, 197, 94, 0.3);
}

.secondary {
  background: rgba(30, 41, 59, 0.7);
  color: white;
  padding: 14px;
  border-radius: 14px;
  cursor: pointer;

  backdrop-filter: blur(10px);

  transition: all 0.25s ease;
}

.secondary:hover {
  border: 1px solid #3b82f6b3;

  box-shadow:
    0 0 6px rgba(59, 130, 246, 0.6),
    0 0 12px rgba(59, 130, 246, 0.4);

  transform: translateY(-1px);
}

.secondary:active {
  transform: scale(0.96);

  box-shadow:
    0 0 4px rgba(59, 130, 246, 0.5);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
}

.modal {
  width: 90%;
  max-width: 320px;
  background: rgba(30, 41, 59, 0.9);
  border-radius: 16px;
  padding: 20px;
}

.modal-title {
  text-align: center;
  margin-bottom: 14px;
  color: #e2e8f0;
}

.modal-input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #0f172a;
  color: white;
  margin-bottom: 14px;
}

.modal-buttons {
  display: flex;
  gap: 10px;
}

.send-btn {
  flex: 1;
  background: #22c55e;
  border-radius: 10px;
  padding: 10px;
  border: none;
}

.cancel-btn {
  flex: 1;
  background: #1e293b;
  border-radius: 10px;
  padding: 10px;
  border: none;
  color: #94a3b8;
}

.modal-message {
  margin-top: 10px;
  text-align: center;
  font-size: 13px;
}

.add-habit { 
  display: flex; 
  gap: 6px; 
  margin-bottom: 14px; 
} 

.add-habit input, .add-habit select { 
  padding: 6px 8px; 
  border-radius: 8px; 
  border: none; 
  background: #0f172a; 
  color: white; 
  } 
  
  .add-habit select { 
    background: #1e293b 
    } 
    
    .add-habit button { 
      background: #22c55e; 
      border-radius: 8px; 
      padding: 6px 12px; 
      border: none; 
      cursor: pointer; }

      .delete-btn { 
        position: absolute; 
        top: 6px; 
        right: 6px; 
        background: transparent; 
        border: none; 
        font-size: 14px; 
        cursor: pointer; 
        color: #f87171; 
        transition: transform 0.15s ease; 
        } 
        
        .delete-btn:hover { 
          transform: scale(1.2); 
          }

  .delete-confirm-btn {
  flex: 1;
  background: #ef4444;
  border-radius: 10px;
  padding: 10px;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.ghost {
  opacity: 0.4;
  transform: scale(0.98);
}

.habit-list > * {
  cursor: grab;
}

.habit-list > *:active {
  cursor: grabbing;
}
</style>

