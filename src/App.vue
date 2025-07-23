<script setup lang="ts">
import HabitList from './components/HabitList.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
</script>

<template>
  <div id="app">
    <h1>My Habits Tracker</h1>
    <HabitList />
    <VueCal style="max-width: 900px; margin: 2rem auto;" />
  </div>
</template>

<style scoped>
.vuecal {
  background-color: #242424;
  color: rgba(255, 255, 255, 0.87);
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.3);
}

.vuecal__header {
  background-color: #1a1a1a;
  border-bottom: 1px solid #555;
  color: #646cff;
  font-weight: 600;
  font-size: 1.25rem;
}

.vuecal__day {
  border: 1px solid #555;
}

.vuecal__day--today {
  background-color: #1e90ff;
  color: white;
  font-weight: bold;
}

.vuecal__event {
  background-color: #646cff;
  color: white;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

.vuecal__event:hover {
  background-color: #535bf2;
}

.vuecal__day--outside-month {
  color: #888;
}

.vuecal__body {
  padding: 0.5rem;
}
</style>

