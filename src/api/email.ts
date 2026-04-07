export const sendReport = async (email: string, reportHTML: string) => {
  const res = await fetch('https://habits-tracker-app-j1tr.onrender.com/send-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      reportHTML,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Server error')
  }

  return data
}