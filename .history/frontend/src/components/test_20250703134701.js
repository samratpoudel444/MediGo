import fetch from "node-fetch"; // Node 18+ has native fetch

async function getLocationByIP(ip = "8.8.8.8") {
  const url = `https://ip-api.com/json/${ip}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "success") {
    throw new Error(`API error: ${data.message || "Unknown error"}`);
  }

  return data;
}

getLocationByIP()
  .then((data) => console.log("Location info:", data))
  .catch((err) => console.error("Error:", err.message));
