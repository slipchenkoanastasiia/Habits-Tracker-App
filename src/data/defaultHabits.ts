import type { Habit } from '../types/Habit'

export const defaultHabits: Habit[] = [
  // Фізичні звички
  {
    id: 'steps_10000',
    name: 'Ходити — 10 000 кроків',
    type: 'physical',
    icon: '🚶‍♀️',
    doneToday: false,
    history: {}
  },
  {
    id: 'jump_rope',
    name: 'Скакалка — 3 підходи по 5 хвилин',
    type: 'physical',
    icon: '🪢',
    doneToday: false,
    history: {}
  },
  {
    id: 'swimming_40min',
    name: 'Плавання — 40 хвилин',
    type: 'physical',
    icon: '🏊‍♀️',
    doneToday: false,
    history: {}
  },
  {
    id: 'stretching_60min',
    name: 'Розтяжка — 60 хвилин',
    type: 'physical',
    icon: '🤸‍♀️',
    doneToday: false,
    history: {}
  },
  {
    id: 'pullups_pushups',
    name: 'Віджимання 50 разів + турнік: вис на руках 2 хв + 1 хв',
    type: 'physical',
    icon: '💪',
    doneToday: false,
    history: {}
  },

  // Ментальні звички
  {
    id: 'one_coffee',
    name: 'Лише 1 чашка кави на день',
    type: 'mental',
    icon: '☕️',
    doneToday: false,
    history: {}
  },
  {
    id: 'meditation_5_10min',
    name: 'Медитація 5–10 хвилин',
    type: 'mental',
    icon: '🧘‍♀️',
    doneToday: false,
    history: {}
  },
  {
    id: 'scroll_limit_30min',
    name: 'Ліміт скролінгу — не більше 30 хв на день',
    type: 'mental',
    icon: '📱❌',
    doneToday: false,
    history: {}
  },
  {
    id: 'reading_10_pages',
    name: 'Читання 10 сторінок',
    type: 'mental',
    icon: '📚',
    doneToday: false,
    history: {}
  },
  {
    id: 'no_swearing',
    name: 'Не матюкатися сьогодні',
    type: 'mental',
    icon: '🤐',
    doneToday: false,
    history: {}
  }
]
