<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  history: Record<string, boolean>
}>()

function getLast7Days() {
  const days: string[] = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    const date = d.toISOString().split('T')[0]
    days.push(date)
  }

  return days
}

const days = computed(() => getLast7Days())

const emit = defineEmits<{
  (e: 'toggle', date: string): void
}>()
</script>

<template>
  <div class="grid">
    <div
      v-for="day in days"
      :key="day"
      :class="['cell', { done: props.history[day] }]"
      @click="emit('toggle', day)"
    />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.cell {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px;
  background: #2b2b2b;
  cursor: pointer;
  transition: 0.2s;
}

.cell.done {
  background: #4caf50;
}
</style>