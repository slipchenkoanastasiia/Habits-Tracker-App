export type HabitType = 'physical' | 'mental'

export interface Habit {
  id: string
  name: string
  type: HabitType
  icon: string
  doneToday: boolean
  history: {
    [date: string]: boolean
  }
}
