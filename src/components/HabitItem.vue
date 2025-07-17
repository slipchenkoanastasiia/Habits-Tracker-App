<template>
  <div class="habit-item" :class="{ done: habit.doneToday }">
    <font-awesome-icon :icon="['fas', habit.icon]" class="habit-icon" />
    <span>{{ habit.name }}</span>
    <button @click="toggleDone" class="done-btn">
      {{ habit.doneToday ? '✓ Done' : 'Mark as done' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Habit } from '@/types/Habit'
import { defineEmits } from 'vue'

const props = defineProps<{ habit: Habit }>()
const emit = defineEmits<{
  (e: 'toggle-done', id: string): void
}>()

function toggleDone() {
  emit('toggle-done', props.habit.id)
}
</script>

<style scoped>
.habit-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.habit-icon {
  font-size: 1.5rem;
  color: #555;
}

.done-btn {
  margin-left: auto;
  cursor: pointer;
  background-color: #1e90ff;
  border: none;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.habit-item.done {
  background-color: #d1f0ff;
  text-decoration: line-through;
  color: #555;
}
</style>
