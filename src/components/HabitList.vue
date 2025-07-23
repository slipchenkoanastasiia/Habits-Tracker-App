<template>
  <div class="habit-list">
    <HabitItem
      v-for="habit in habits"
      :key="habit.id"
      :habit="habit"
      @toggle-done="toggleDone"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Habit } from '@/types/Habit'
import { defaultHabits } from '@/data/defaultHabits'
import HabitItem from './HabitItem.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css' 

const STORAGE_KEY = 'habits-tracker-data'

const habits = ref<Habit[]>([])

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
  if (habit) {
    habit.doneToday = !habit.doneToday
  }
}
</script>

<style scoped>
.habit-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
