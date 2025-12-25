export async function getRadioPlayerData(signal) {
  try {
    const response = await fetch(
      "https://api.sr.se/api/v2/channels?format=json",
      { signal }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.channels;
  } catch (err) {
    // Re-throw the error so the caller can handle it
    // But ignore AbortError as it's intentional
    if (err.name === "AbortError") {
      throw err;
    }
    console.error("Failed to fetch radio channels:", err);
    throw err;
  }
}
