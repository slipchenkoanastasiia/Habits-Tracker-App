import type { Habit } from '@/types/Habit'

export const defaultHabits: Habit[] = [
  // Фізичні звички
  {
    id: 'steps_10000',
    name: 'Walk 10,000 steps',
    type: 'physical',
    icon: 'fa-solid fa-shoe-prints',
    doneToday: false,
    history: {},
  },
  {
    id: 'jump_rope',
    name: 'Jump rope – 3 sets, 5 min each',
    type: 'physical',
    icon: 'fa-solid fa-repeat',
    doneToday: false,
    history: {},
  },
  {
    id: 'swimming_40min',
    name: 'Swim 40 minutes',
    type: 'physical',
    icon: 'fa-solid fa-water-ladder',
    doneToday: false,
    history: {},
  },
  {
    id: 'stretching_60min',
    name: 'Stretching 60 minutes',
    type: 'physical',
    icon: 'fa-solid fa-moon',
    doneToday: false,
    history: {},
  },
  {
    id: 'pullups_pushups',
    name: '50 push-ups + pull-up holds',
    type: 'physical',
    icon: 'fa-solid fa-hands',
    doneToday: false,
    history: {},
  },

  // Ментальні звички
  {
    id: 'one_coffee',
    name: 'Only 1 cup of coffee per day',
    type: 'mental',
    icon: 'fa-solid fa-mug-hot',
    doneToday: false,
    history: {},
  },
  {
    id: 'meditation_5_10min',
    name: 'Meditate 5-10 minutes',
    type: 'mental',
    icon: 'fa-solid fa-sun',
    doneToday: false,
    history: {},
  },
  {
    id: 'scroll_limit_30min',
    name: 'Scroll limit 30 minutes',
    type: 'mental',
    icon: 'fa-solid fa-mobile',
    doneToday: false,
    history: {},
  },
  {
    id: 'reading_10_pages',
    name: 'Read 10 pages',
    type: 'mental',
    icon: 'fa-solid fa-bookmark',
    doneToday: false,
    history: {},
  },
  {
    id: 'no_swearing',
    name: 'No swearing',
    type: 'mental',
    icon: 'fa-solid fa-face-smile-wink',
    doneToday: false,
    history: {},
  },
]
