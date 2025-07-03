import fetch from "node-fetch"; // or use native fetch in Node 18+

async function getLocationByIP(ip = "") {
  // '' = your current IP if run on a server
  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await response.json();
  return data;
}

getLocationByIP()
  .then((data) => console.log("Location info:", data))
  .catch((err) => console.error("Error:", err));
