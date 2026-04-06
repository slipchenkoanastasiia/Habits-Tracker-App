<template>
  <div class="container">
    <h1 class="title">Monthly Overview</h1>

    <div class="calendar">
      <div
        v-for="day in daysInMonth"
        :key="day"
        :class="['day', getLevel(day)]"
      >
        {{ day }}
      </div>
    </div>

<div class="stats">
  <div class="progress-row">
    <div 
      class="progress-circle" 
      :style="{ '--percent': animatedPhysicalPercent, '--color': '#22c55e' }"
    >
      <span class="percent">{{ Math.round(animatedPhysicalPercent) }}%</span>
      <span class="label">Physical</span>
    </div>

    <div 
      class="progress-circle" 
      :style="{ '--percent': animatedMentalPercent, '--color': '#4ade80' }"
    >
      <span class="percent">{{ Math.round(animatedMentalPercent) }}%</span>
      <span class="label">Mental</span>
    </div>
  </div>

  <div class="streak">
    🔥 Streak: {{ streak }} days
  </div>
</div>
</div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Habit } from '@/types/Habit'

const STORAGE_KEY = 'habits-tracker-data'
const habits = ref<Habit[]>([])

const currentDate = new Date()

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    habits.value = JSON.parse(saved)
  }

  animateCircle(animatedPhysicalPercent, physicalPercent.value)
  animateCircle(animatedMentalPercent, mentalPercent.value)
})

function getLocalDate(date: Date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

const daysInMonth = computed(() => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const days = new Date(year, month + 1, 0).getDate()

  const firstDay = new Date(year, month, 1).getDay() 
  const offset = firstDay === 0 ? 6 : firstDay - 1 

  const arr: (number | null)[] = Array(offset).fill(null) 
  for (let i = 1; i <= days; i++) arr.push(i)

  return arr
})

function getLevel(day: number | null) {
  if (day === null) return 'level-0'

  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
  const dateStr = getLocalDate(date)

  let count = 0
  habits.value.forEach(habit => {
    if (habit.history?.[dateStr]) count++
  })

  if (count === 0) return 'level-0'

  const maxHabits = habits.value.length || 1
  const ratio = count / maxHabits

if (count === 0) return 'level-0'
if (count === 1) return 'level-1'
if (count === 2) return 'level-2'
if (count === 3) return 'level-3'
return 'level-4'
}

const physicalPercent = computed(() => {
  const physical = habits.value.filter(h => h.type === 'physical')
  let total = 0, done = 0
  physical.forEach(habit => {
    Object.values(habit.history || {}).forEach(val => { total++; if(val) done++ })
  })
  return total ? Math.round((done / total) * 100) : 0
})

const mentalPercent = computed(() => {
  const mental = habits.value.filter(h => h.type === 'mental')
  let total = 0, done = 0
  mental.forEach(habit => {
    Object.values(habit.history || {}).forEach(val => { total++; if(val) done++ })
  })
  return total ? Math.round((done / total) * 100) : 0
})

const streak = computed(() => {
  let count = 0
  const today = getLocalDate(new Date())

  for (let i = 0; i < 365; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = getLocalDate(d)

    const hasActivity = habits.value.some(h => h.history?.[key])
    if (hasActivity) count++
    else break
  }

  return count
})

const animatedPhysicalPercent = ref(0)
const animatedMentalPercent = ref(0)

function animateCircle(refValue: any, target: number) {
  let start = 0
  const step = () => {
    start += 1
    if (start <= target) {
      refValue.value = start
      requestAnimationFrame(step)
    } else {
      refValue.value = target
    }
  }
  requestAnimationFrame(step)
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
  margin-bottom: 40px;
  color: var( --text-secondary);
  text-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding: 14px;
  border-radius: 18px;
  backdrop-filter: blur(12px);
}

.day {
  aspect-ratio: 1;
  border-radius: 10px;
  font-weight: 600;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  background: var(--bg-card);
  backdrop-filter: blur(6px);
  transition: all 0.2s ease;
  cursor: pointer;
}

.day:hover {
  transform: translateY(-2px) scale(1.05);
}

.level-0 {
  background: #2b2b2b;
}

.level-1 {
  background: #81ec91;
}

.level-2 {
  background: #54dd76;
}

.level-3 {
  background: #39d353;
  box-shadow: 0 0 6px rgba(57, 211, 83, 0.6);
}

.level-4 {
  background: #00ff66;
  box-shadow: 0 0 10px rgba(0, 255, 102, 0.9);
}

.stats {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.progress-row {
  display: flex;
  gap: 60px;
  justify-content: center;
}

.progress-circle {
  --size: 100px;
  --percent: 0;
  --color: var(--green);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: conic-gradient(
    var(--color) calc(var(--percent) * 1%),
    transparent 0
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  font-weight: bold;
  color: white;
  position: relative;
}

.progress-circle .percent {
  font-size: 16px;
}

.progress-circle span {
  position: relative;
  z-index: 1;
}

.progress-circle .label {
  font-size: 12px;
  margin-top: 4px;
  color: white;;
}

.streak {
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-top: 10px;
}

</style>