<template>
  <div class="habit-item">
    <HabitGrid
      :history="historySafe"
      :habit-id="habit.id"
      :habit-name="habit.name"
      :habit-done="habit.doneToday"
      @toggle="toggleDay"
      @toggle-today="toggleDone"
      @delete-habit="deleteHabit"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Habit } from '@/types/Habit'
import HabitGrid from './HabitGrid.vue'

const props = defineProps<{ habit: Habit }>()

const historySafe = computed(() => props.habit.history || {})

const emit = defineEmits<{
  (e: 'toggle-done', id: string): void
  (e: 'toggle-day', date: string): void
  (e: 'delete-habit', id: string): void
}>()

function toggleDone() {
  emit('toggle-done', props.habit.id)
}

function toggleDay(date: string) {
  emit('toggle-day', date)
}

function deleteHabit() {
  emit('delete-habit', props.habit.id)
}
</script>

<style scoped>
.habit-item {
  width: 100%;
}
</style>