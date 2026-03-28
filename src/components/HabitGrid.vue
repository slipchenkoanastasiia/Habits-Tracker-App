<template>
  <div class="habit-card">
    <div class="habit-header">
      <div class="habit-title">
        <i class="fas fa-bolt"></i>
        <span>{{ habitName }}</span>
      </div>
      <button class="done-btn" @click="toggleToday">{{ habitDone ? '✓ Done' : 'Mark Done' }}</button>
    </div>

    <div class="habit-stats">
      <p>Progress: {{ progress }}%</p>
      <p>🔥 Streak: {{ streak }} days</p>
    </div>

    <div class="habit-week-grid">
      <div
        v-for="day in days"
        :key="day"
        :class="['day-cell', getLevel(history[day] ?? false)]"
        @click="handleClick(day)"
        :title="`${formatDate(day)} — ${history[day] ? 'Done' : 'Not done'}`"
      >
        {{ getDayLetter(day) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  history: Record<string, boolean>,
  habitName: string,
  habitDone: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', date: string, value: boolean): void
  (e: 'toggleToday'): void
}>()

function getLast7Days() {
  const days: string[] = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    days.push(d.toLocaleDateString('en-CA'))
  }

  return days
}

const days = computed(() => getLast7Days())

function getLevel(value: boolean) {
  return value ? 'level-3' : 'level-0'
}

function formatDate(date: string) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')

  return `${day}.${month}`
}

function getDayLetter(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
}

function handleClick(day: string) {
  const current = props.history[day] ?? false
  emit('toggle', day, !current)
}

function toggleToday() {
  emit('toggleToday')
}

const progress = computed(() => {
  const values = days.value.map(d => props.history[d] ? 1 : 0)
  const total = values.length
  const done = values.reduce((a, b) => a + b, 0)
  return Math.round((done / total) * 100)
})

const streak = computed(() => {
  let count = 0
  for (let i = days.value.length - 1; i >= 0; i--) {
    if (props.history[days.value[i]]) count++
    else break
  }
  return count
})
</script>

<style scoped>
.habit-card {
  background: #111;
  border-radius: 12px;
  padding: 16px;
  margin: 10px 0;
  box-shadow: 0 0 12px rgba(0,0,0,0.6);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.habit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.habit-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
}

.habit-title i {
  font-size: 18px;
}

.done-btn {
  background: #22c55e;
  border: none;
  color: black;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
}

.habit-stats {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #ccc;
}

.habit-week-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.day-cell {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.day-cell.level-0 { background: #222; }
.day-cell.level-3 { background: #39d353; box-shadow: 0 0 5px rgba(57, 211, 83, 0.6); }

.day-cell:hover {
  transform: scale(1.1);
  box-shadow: 0 0 8px rgba(57, 211, 83, 0.9);
}
</style>