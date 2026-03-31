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
      <button class="secondary" @click="goToMonthly">
  Monthly Overview
</button>
      <button class="primary">Send Weekly Report</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Habit } from '@/types/Habit'
import { defaultHabits } from '@/data/defaultHabits'
import HabitItem from '@/components/HabitItem.vue'

const STORAGE_KEY = 'habits-tracker-data'

const habits = ref<Habit[]>([])
const activeTab = ref<'all' | 'physical' | 'mental'>('all')

const currentDate = ref(new Date())


const router = useRouter()

function goToMonthly() {
  router.push('/monthly')
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
  border: 1px solid rgba(59, 130, 246, 0.7);

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

</style>