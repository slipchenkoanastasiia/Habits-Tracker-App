<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  history: Record<string, number>
}>()

const emit = defineEmits<{
  (e: 'toggle', date: string, value: number): void
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

function getLevel(value: number) {
  if (value === 0) return 'level-0'
  if (value === 1) return 'level-1'
  if (value === 2) return 'level-2'
  if (value === 3) return 'level-3'
  return 'level-4'
}

function formatDate(date: string) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')

  return `${day}.${month}`
}

function handleClick(day: string) {
  const current = props.history[day] ?? 0

  const next = current === 0 ? 1 : 0

  emit('toggle', day, next)
}

const progress = computed(() => {
  const values = days.value.map(d => props.history[d] ?? 0)

  const total = values.length * 4
  const done = values.reduce((a, b) => a + b, 0)

  return Math.round((done / total) * 100)
})

const streak = computed(() => {
  let count = 0

  for (let i = days.value.length - 1; i >= 0; i--) {
    const day = days.value[i]
    const val = props.history[day] ?? 0

    if (val > 0) count++
    else break
  }

  return count
})
</script>

<template>
  <div>
    <div class="stats">
      <p>Progress: {{ progress }}%</p>
      <p>🔥 Streak: {{ streak }} days</p>
    </div>

    <div class="grid">
      <div
        v-for="day in days"
        :key="day"
        :class="['cell', getLevel(history[day] ?? 0)]"
        @click="handleClick(day)"
        :title="`${formatDate(day)} — ${(history[day] ?? 0) > 0 ? 'Done' : 'Not done'}`"
      ></div>
    </div>
  </div>
</template>

<style scoped>

.grid {
  display: grid;
  grid-template-columns: repeat(7, 14px);
  gap: 6px;
  margin-top: 10px;
}

.stats {
  font-size: 12px;
  color: #ccc;
  margin-bottom: 6px;
}

.cell {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  cursor: pointer;

  transition: all 0.25s ease;

  opacity: 0;
  transform: scale(0.5);
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.cell:hover {
  transform: scale(1.6);
  box-shadow: 0 0 8px rgba(57, 211, 83, 0.9);
}

.level-0 {
  background: #2b2b2b;
}

.level-1 {
  background: #b7f7c1;
}

.level-2 {
  background: #7df49a;
}

.level-3 {
  background: #39d353;
  box-shadow: 0 0 5px rgba(57, 211, 83, 0.6);
}

.level-4 {
  background: #00ff66;
  box-shadow: 0 0 10px rgba(0, 255, 102, 0.9);
}
</style>