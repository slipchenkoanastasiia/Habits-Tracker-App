<template>
  <div class="habit-item">
    <HabitGrid
      :history="historySafe"
      :habitName="habit.name"
      :habitDone="habit.doneToday"
      @toggle="toggleDay"
      @toggleToday="toggleDone"
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
}>()

function toggleDone() {
  emit('toggle-done', props.habit.id)
}

function toggleDay(date: string) {
  if (!props.habit.history) props.habit.history = {}
  props.habit.history[date] = !props.habit.history[date]
}
</script>

<style scoped>
.habit-item {
  width: 100%;
}
</style>