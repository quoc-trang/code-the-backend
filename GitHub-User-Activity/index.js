const argv = process.argv
const username = argv.slice(2)[0]

async function fetchUserActivity() {
  try {
    const result = await fetch(
      `https://api.github.com/users/${username}/events`,
    )
    const activities = await result.json()
    return activities
  } catch (error) {
    console.error(error)
  }
}

const result = await fetchUserActivity()
console.table(result);