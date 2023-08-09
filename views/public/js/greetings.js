export async function getGreetings(moment, day) {
    const response = await fetch(`/greetings/${moment}/${day}`)
    const data = await response.json()
    return data
}