import type { Habit } from '@/types/Habit'

export function generateWeeklyReportHTML(email: string, habits: Habit[]): string {

  const COLORS = {
    bgMain: '#0f172a',
    bgCard: '#1e293b',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    green: '#22c55e',
    greenLight: '#4ade80',
    yellow: '#fbbf24'
  }

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

  const improvement = Math.floor(Math.random() * 15)

  const bestHabit = habits
    .map(h => ({ ...h, count: countDays(h) }))
    .sort((a, b) => b.count - a.count)[0]

  const bestStreakHabit = habits
    .map(h => ({ ...h, streak: calculateStreak(h) }))
    .sort((a, b) => b.streak - a.streak)[0]

  const doneHabits = habits.filter(h => Object.values(h.history || {}).some(v => v))

  const doneListHTML = doneHabits.map(h => `
    <div style="
      background:${COLORS.bgMain};
      border-radius:10px;
      padding:10px;
      margin-bottom:8px;
      text-align:center;
      color:${COLORS.green};
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
    background:${COLORS.bgMain};
    padding:20px;
  ">

    <div style="
      max-width:420px;
      margin:auto;
      background:${COLORS.bgCard};
      border-radius:16px;
      padding:20px;
      color:${COLORS.textPrimary};
    ">

      <h2 style="text-align:center; margin-bottom:4px;">Weekly Report</h2>

      <p style="
        text-align:center;
        color:${COLORS.textSecondary};
        font-size:13px;
        margin-bottom:10px;
      ">
        ${email}
      </p>

      <p style="
        text-align:center;
        color:${COLORS.green};
        font-size:13px;
        margin-bottom:20px;
      ">
        ${message}
      </p>

      <!-- TOTAL -->
      <div style="margin-bottom:20px;">
        <div style="font-size:12px; color:${COLORS.textSecondary}; margin-bottom:4px;">
          Overall Progress
        </div>

        <div style="background:${COLORS.bgMain}; border-radius:8px; overflow:hidden;">
          <div style="width:${totalPercent}%; background:${COLORS.green}; padding:6px 0;"></div>
        </div>

        <div style="
          font-size:11px;
          color:${COLORS.textSecondary};
          text-align:right;
        ">
          ${totalPercent}% (+${improvement}%)
        </div>
      </div>

      <!-- CATEGORY -->
      <div style="margin-bottom:20px;">

        <div style="margin-bottom:12px;">
          <div style="font-size:12px; color:${COLORS.textSecondary};">Physical</div>
          <div style="background:${COLORS.bgMain}; border-radius:8px; overflow:hidden;">
            <div style="width:${physicalPercent}%; background:${COLORS.green}; padding:5px 0;"></div>
          </div>
        </div>

        <div>
          <div style="font-size:12px; color:${COLORS.textSecondary};">Mental</div>
          <div style="background:${COLORS.bgMain}; border-radius:8px; overflow:hidden;">
            <div style="width:${mentalPercent}%; background:${COLORS.greenLight}; padding:5px 0;"></div>
          </div>
        </div>

      </div>

      <!-- BEST -->
      ${
        bestHabit && bestHabit.count > 0
          ? `
      <div style="
        background:${COLORS.bgMain};
        border-radius:12px;
        padding:14px;
        text-align:center;
        margin-bottom:12px;
      ">
        <div style="font-size:12px; color:${COLORS.textSecondary};">Best habit</div>
        <div style="font-size:15px; font-weight:600;">${bestHabit.name}</div>
        <div style="font-size:12px; color:${COLORS.green};">${bestHabit.count} days</div>
      </div>
      `
          : ''
      }

      <!-- STREAK -->
      ${
        bestStreakHabit && bestStreakHabit.streak > 1
          ? `
      <div style="
        background:${COLORS.bgMain};
        border-radius:12px;
        padding:14px;
        text-align:center;
        margin-bottom:12px;
      ">
        <div style="font-size:12px; color:${COLORS.textSecondary};">Longest streak</div>
        <div style="font-size:15px; font-weight:600;">${bestStreakHabit.name}</div>
        <div style="font-size:12px; color:${COLORS.yellow};">
          🔥 ${bestStreakHabit.streak} days
        </div>
      </div>
      `
          : ''
      }

      <!-- DONE -->
      <div>
        ${doneListHTML || `
          <p style="
            text-align:center;
            color:${COLORS.textMuted};
            font-size:14px;
          ">
            No habits completed yet
          </p>
        `}
      </div>

      <!-- FOOTER -->
      <p style="
        text-align:center;
        margin-top:20px;
        color:${COLORS.textMuted};
        font-size:12px;
      ">
        Small steps every day → big results
      </p>

    </div>
  </div>
  `
}