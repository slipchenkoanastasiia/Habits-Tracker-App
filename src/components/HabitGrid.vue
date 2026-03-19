<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  history: Record<string, boolean>
}>()

const emit = defineEmits<{
  (e: 'toggle', date: string): void
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

function getLevel(done?: boolean) {
  if (!done) return 'level-0'
  return 'level-4'
}

function formatDate(date: string) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')

  return `${day}.${month}`
}
</script>

<template>
  <div class="grid">
    <div
  v-for="day in days"
  :key="day"
  :class="['cell', getLevel(props.history[day] ?? false)]"
  @click="emit('toggle', day)"
  :title="`${formatDate(day)} — ${(props.history[day] ?? false) ? 'Done' : 'Not done'}`"
/>
  </div>
</template>

<style scoped>

.grid {
  display: grid;
  grid-template-columns: repeat(7, 10px);
  gap: 4px;
  margin-top: 8px;
}

.cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cell:hover {
  transform: scale(1.5);
}

.level-0 {
  background: #2b2b2b;
}

.level-1 {
  background: #0e4429;
}

.level-2 {
  background: #006d32;
}

.level-3 {
  background: #26a641;
}

.level-4 {
  background: #39d353;
}

.level-1:hover,
.level-2:hover,
.level-3:hover,
.level-4:hover {
  box-shadow: 0 0 6px rgba(57, 211, 83, 0.8);
}
</style>