import type { Habit } from '@/types/Habit'

export function generateWeeklyReportHTML(email: string, habits: Habit[]): string {
  const physicalHabits = habits.filter(h => h.type === 'physical')
  const mentalHabits = habits.filter(h => h.type === 'mental')

  const countDone = (list: Habit[]) => {
    let done = 0, total = 0
    list.forEach(h => {
      Object.values(h.history || {}).forEach(val => { total++; if(val) done++ })
    })
    return total ? Math.round((done / total) * 100) : 0
  }

  const physicalPercent = countDone(physicalHabits)
  const mentalPercent = countDone(mentalHabits)

  const habitRows = habits.map(h => {
    const doneDays = Object.entries(h.history || {})
      .filter(([_, val]) => val)
      .map(([date]) => date)
      .join(', ') || 'No progress'

    return `<tr>
      <td style="padding:8px; border:1px solid #ccc; color:#94a3b8">${h.name}</td>
      <td style="padding:8px; border:1px solid #ccc; color:#94a3b8">${h.type}</td>
      <td style="padding:8px; border:1px solid #ccc; color:#94a3b8">${doneDays}</td>
    </tr>`
  }).join('')

  return `
  <div style="font-family:sans-serif; background:#1e293b; color:white; padding:20px; border-radius:12px; max-width:600px; margin:auto;">
    <h2 style="text-align:center; color:#94a3b8">Weekly Habit Report</h2>
    <p style="text-align:center; color:#cbd5f5">Hello ${email}! Here is your progress for this week:</p>

    <div style="display:flex; justify-content:center; gap:40px; margin:20px 0;">
      <div style="width:100px; height:100px; border-radius:50%; background:conic-gradient(#22c55e ${physicalPercent}%, #0f172a 0); display:flex; align-items:center; justify-content:center; flex-direction:column; color:white; font-weight:bold;">
        <span>${physicalPercent}%</span>
        <span style="font-size:12px; margin-top:4px; color:#cbd5f5">Physical</span>
      </div>
      <div style="width:100px; height:100px; border-radius:50%; background:conic-gradient(#4ade80 ${mentalPercent}%, #0f172a 0); display:flex; align-items:center; justify-content:center; flex-direction:column; color:white; font-weight:bold;">
        <span>${mentalPercent}%</span>
        <span style="font-size:12px; margin-top:4px; color:#cbd5f5">Mental</span>
      </div>
    </div>

    <table style="width:100%; border-collapse:collapse; margin-top:10px; background:#0f172a; border-radius:8px; overflow:hidden;">
      <thead>
        <tr>
          <th style="padding:8px; border:1px solid #3b4251; color:#94a3b8">Habit</th>
          <th style="padding:8px; border:1px solid #3b4251; color:#94a3b8">Type</th>
          <th style="padding:8px; border:1px solid #3b4251; color:#94a3b8">Done Days</th>
        </tr>
      </thead>
      <tbody>
        ${habitRows}
      </tbody>
    </table>

    <p style="text-align:center; margin-top:20px; color:#94a3b8">Keep up the good work! 🔥</p>
  </div>
  `
}