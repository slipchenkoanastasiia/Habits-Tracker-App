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

    <div class="habit-list">
      <HabitItem
        v-for="habit in filteredHabits"
        :key="habit.id"
        :habit="habit"
        @toggle-done="toggleDone"
      />
    </div>

    <div class="actions">
      <button class="secondary">Monthly Overview</button>
      <button class="primary">Send Weekly Report</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import type { Habit } from '@/types/Habit'
import { defaultHabits } from '@/data/defaultHabits'
import HabitItem from './HabitItem.vue'

const STORAGE_KEY = 'habits-tracker-data'

const habits = ref<Habit[]>([])
const activeTab = ref<'all' | 'physical' | 'mental'>('all')

const currentDate = ref(new Date())

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
})

watch(habits, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

function toggleDone(id: string) {
  const habit = habits.value.find(h => h.id === id)
  if (habit) habit.doneToday = !habit.doneToday
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
  currentDate.value = new Date(currentDate.value.getTime() - 7 * 24 * 60 * 60 * 1000)
}

function nextWeek() {
  currentDate.value = new Date(currentDate.value.getTime() + 7 * 24 * 60 * 60 * 1000)
}
</script>

<style scoped>
.container {
  max-width: 420px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.tabs button {
  flex: 1;
  padding: 8px;
  border-radius: 10px;
  background: #1e293b;
  border: none;
  color: #aaa;
  cursor: pointer;
}

.tabs button.active {
  background: #22c55e;
  color: black;
}

.week-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.week-nav button {
  padding: 4px 10px;
  border-radius: 8px;
  border: none;
  background: #1e293b;
  color: #aaa;
  cursor: pointer;
}

.week-nav span {
  font-weight: bold;
  color: white;
}

.habit-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.primary {
  background: #22c55e;
  color: black;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.secondary {
  background: #334155;
  color: white;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
</style>