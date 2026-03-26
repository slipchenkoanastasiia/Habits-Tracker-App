export const sendReport = async (email: string, report: string) => {
  const res = await fetch('http://localhost:5001/send-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      report,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Server error')
  }

  return data
}