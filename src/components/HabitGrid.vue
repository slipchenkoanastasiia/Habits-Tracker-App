<template>
  <div class="habit-card">
    <div class="habit-header">
      <div class="habit-title">
        <i class="lightning">⚡</i>
        <span>{{ habitName }}</span>
      </div>

      <div class="habit-actions">
        <button class="done-btn" @click="toggleToday">
          {{ habitDone ? '✓ Done' : 'Mark Done' }}
        </button>
        <button class="delete-btn" @click="$emit('delete-habit', habitId)">🗑️</button>
      </div>
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
  habitId: string,
  history: Record<string, boolean>,
  habitName: string,
  habitDone: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', date: string, value: boolean): void
  (e: 'toggleToday', id: string): void
  (e: 'delete-habit', id: string): void
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
  emit('toggleToday', props.habitId)
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
  background: rgba(15, 23, 42, 0.7);
  border-radius: 18px;
  padding: 18px;
  margin: 10px 0;
  color: #94a3b8;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
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
  font-weight: 600;
  font-size: 15px;
  color: #fff;
}

.lightning {
  font-size: 18px;
  color: #facc15; 
  margin-right: 6px;
}

.habit-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}

.done-btn {
  background: linear-gradient(135deg, #22c55e, #4ade80);
  border: none;
  color: black;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.25s ease;
}

.done-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(34, 197, 94, 0.5);
}

.done-btn:active {
  transform: scale(0.96);
}

.delete-btn {
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #f87171;
  transition: transform 0.15s ease;
}

.delete-btn:hover {
  transform: scale(1.2);
}

.habit-stats {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
}

.habit-week-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.day-cell {
  height: 42px;
  border-radius: 12px;

  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(6px);

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 15px;

  transition: all 0.25s ease;
}

.day-cell.level-3 {
  background: linear-gradient(135deg, #22c55e, #4ade80);
  color: black;

  box-shadow: 
    0 0 12px rgba(34, 197, 94, 0.7),
    0 0 24px rgba(34, 197, 94, 0.4);
}

.day-cell:hover {
  transform: translateY(-2px) scale(1.04);
}
</style>