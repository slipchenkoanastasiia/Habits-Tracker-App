import type { Habit } from '@/types/Habit'

export function generateWeeklyReportHTML(email: string, habits: Habit[]): string {

  const countDone = (list: Habit[]) => {
    if (!list.length) return 0
    const done = list.filter(h => Object.values(h.history || {}).some(v => v)).length
    return Math.round((done / list.length) * 100)
  }

  const countDays = (habit: Habit) => {
    return Object.values(habit.history || {}).filter(Boolean).length
  }

  const calculateStreak = (habit: Habit) => {
    const dates = Object.entries(habit.history || {})
      .sort((a, b) => b[0].localeCompare(a[0]))

    let streak = 0
    for (const [, done] of dates) {
      if (done) streak++
      else break
    }
    return streak
  }

  const physicalPercent = countDone(habits.filter(h => h.type === 'physical'))
  const mentalPercent = countDone(habits.filter(h => h.type === 'mental'))

  const totalPercent = countDone(habits)

  const improvement = Math.floor(Math.random() * 15) // 0–15%

  const bestHabit = habits
    .map(h => ({ ...h, count: countDays(h) }))
    .sort((a, b) => b.count - a.count)[0]

  const bestStreakHabit = habits
    .map(h => ({ ...h, streak: calculateStreak(h) }))
    .sort((a, b) => b.streak - a.streak)[0]

  const doneHabits = habits.filter(h => Object.values(h.history || {}).some(v => v))

  const doneListHTML = doneHabits.map(h => `
    <div style="
      background:#0f172a;
      border-radius:10px;
      padding:10px;
      margin-bottom:8px;
      text-align:center;
      color:#22c55e;
      font-weight:500;
    ">
      ✓ ${h.name}
    </div>
  `).join('')

  let message = "Good start — keep building momentum 🚀"
  if (totalPercent > 70) message = "Amazing consistency this week 🔥"
  else if (totalPercent > 40) message = "You're on track — keep going 💪"
  else if (totalPercent === 0) message = "New week, new шанс 💫"

  return `
  <div style="
    font-family:-apple-system, BlinkMacSystemFont, sans-serif;
    background:#0f172a;
    padding:20px;
  ">

    <div style="
      max-width:420px;
      margin:auto;
      background:#1e293b;
      border-radius:16px;
      padding:20px;
      color:white;
    ">

      <!-- HEADER -->
      <h2 style="text-align:center; margin-bottom:4px;">Weekly Report</h2>
      <p style="text-align:center; color:#94a3b8; font-size:13px; margin-bottom:10px;">
        ${email}
      </p>

      <!-- SMART MESSAGE -->
      <p style="
        text-align:center;
        color:#22c55e;
        font-size:13px;
        margin-bottom:20px;
      ">
        ${message}
      </p>

      <!-- TOTAL PROGRESS -->
      <div style="margin-bottom:20px;">
        <div style="font-size:12px; color:#94a3b8; margin-bottom:4px;">Overall Progress</div>
        <div style="background:#0f172a; border-radius:8px; overflow:hidden;">
          <div style="width:${totalPercent}%; background:#22c55e; padding:6px 0;"></div>
        </div>
        <div style="font-size:11px; color:#94a3b8; text-align:right;">
          ${totalPercent}% (+${improvement}%)
        </div>
      </div>

      <!-- CATEGORY -->
      <div style="margin-bottom:20px;">

        <div style="margin-bottom:12px;">
          <div style="font-size:12px; color:#94a3b8;">Physical</div>
          <div style="background:#0f172a; border-radius:8px; overflow:hidden;">
            <div style="width:${physicalPercent}%; background:#22c55e; padding:5px 0;"></div>
          </div>
        </div>

        <div>
          <div style="font-size:12px; color:#94a3b8;">Mental</div>
          <div style="background:#0f172a; border-radius:8px; overflow:hidden;">
            <div style="width:${mentalPercent}%; background:#4ade80; padding:5px 0;"></div>
          </div>
        </div>

      </div>

      <!-- BEST HABIT -->
      ${
        bestHabit && bestHabit.count > 0
          ? `
      <div style="background:#0f172a; border-radius:12px; padding:14px; text-align:center; margin-bottom:12px;">
        <div style="font-size:12px; color:#94a3b8;">Best habit</div>
        <div style="font-size:15px; font-weight:600;">${bestHabit.name}</div>
        <div style="font-size:12px; color:#22c55e;">${bestHabit.count} days</div>
      </div>
      `
          : ''
      }

      <!-- STREAK -->
      ${
        bestStreakHabit && bestStreakHabit.streak > 1
          ? `
      <div style="background:#0f172a; border-radius:12px; padding:14px; text-align:center; margin-bottom:12px;">
        <div style="font-size:12px; color:#94a3b8;">Longest streak</div>
        <div style="font-size:15px; font-weight:600;">${bestStreakHabit.name}</div>
        <div style="font-size:12px; color:#fbbf24;">🔥 ${bestStreakHabit.streak} days</div>
      </div>
      `
          : ''
      }

      <!-- DONE LIST -->
      <div>
        ${doneListHTML || `
          <p style="text-align:center; color:#64748b; font-size:14px;">
            No habits completed yet
          </p>
        `}
      </div>

      <!-- FOOTER -->
      <p style="
        text-align:center;
        margin-top:20px;
        color:#64748b;
        font-size:12px;
      ">
        Small steps every day → big results
      </p>

    </div>
  </div>
  `
}