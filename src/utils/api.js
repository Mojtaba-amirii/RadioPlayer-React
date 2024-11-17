export async function getRadioPlayerData() {
  try {
    const response = await fetch(
      "https://api.sr.se/api/v2/channels?format=json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.channels;
  } catch (err) {
    console.error("Failed to fetch radio channels:", err);
    return [];
  }
}
