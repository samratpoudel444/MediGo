import fetch from "node-fetch"; // for Node.js < 18, skip if native fetch

async function getLocationByIP(ip = "") {
  try {
    // Construct URL, no trailing slash if IP is empty
    const url = ip
      ? `https://ip-api.com/json/${ip}`
      : "https://ip-api.com/json";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Node.js Fetch", // ip-api recommends user-agent header
      },
    });

    if (!response.ok) {
      throw new Error(`Network response not ok: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "success") {
      throw new Error(`API error: ${data.message || "Unknown error"}`);
    }

    return data;
  } catch (err) {
    throw new Error(`Fetch failed: ${err.message}`);
  }
}

// Usage example:

getLocationByIP() // For your IP
  .then((data) => console.log("Your location:", data))
  .catch((err) => console.error("Error:", err.message));

getLocationByIP("8.8.8.8") // For specific IP
  .then((data) => console.log("Google DNS location:", data))
  .catch((err) => console.error("Error:", err.message));
