import type { Habit } from '@/types/Habit'

export function generateWeeklyReportHTML(email: string, habits: Habit[]): string {
  const physicalHabits = habits.filter(h => h.type === 'physical')
  const mentalHabits = habits.filter(h => h.type === 'mental')

  const countDone = (list: Habit[]) => {
    if (!list.length) return 0
    const done = list.filter(h => Object.values(h.history || {}).some(v => v)).length
    return Math.round((done / list.length) * 100)
  }

  const physicalPercent = countDone(physicalHabits)
  const mentalPercent = countDone(mentalHabits)

  const doneHabits = habits.filter(h => Object.values(h.history || {}).some(v => v))

  const doneListHTML = doneHabits.map(h => `
    <div style="margin:6px 0; color:#22c55e; font-weight:500; text-align:center;">✅ ${h.name}</div>
  `).join('')

  return `
  <div style="font-family:sans-serif; background:#1e293b; color:white; padding:20px; border-radius:12px; max-width:420px; margin:auto;">
    <h2 style="text-align:center; color:#94a3b8; margin-bottom:12px;">Weekly Habit Report</h2>
    <p style="text-align:center; color:#cbd5f5; margin-bottom:16px;">Hello ${email}! Here's your progress this week:</p>

    <div style="display:flex; justify-content:center; gap:24px; margin-bottom:20px;">
      <div style="width:100px; height:100px; border-radius:50%; background:conic-gradient(#22c55e ${physicalPercent}%, #0f172a 0); display:flex; align-items:center; justify-content:center; flex-direction:column; font-weight:bold; color:white;">
        <span>${physicalPercent}%</span>
        <span style="font-size:12px; color:#cbd5f5;">Physical</span>
      </div>
      <div style="width:100px; height:100px; border-radius:50%; background:conic-gradient(#4ade80 ${mentalPercent}%, #0f172a 0); display:flex; align-items:center; justify-content:center; flex-direction:column; font-weight:bold; color:white;">
        <span>${mentalPercent}%</span>
        <span style="font-size:12px; color:#cbd5f5;">Mental</span>
      </div>
    </div>

    <div style="margin-top:12px;">
      ${doneListHTML || '<p style="text-align:center; color:#94a3b8;">No habits completed yet 😔</p>'}
    </div>

    <p style="text-align:center; margin-top:20px; color:#94a3b8;">Keep up the good work! 🔥</p>
  </div>
  `
}