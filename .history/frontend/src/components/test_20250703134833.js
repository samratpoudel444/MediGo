async function getLocationByIP(ip = "") {
  const url = `http://ip-api.com/json/${ip}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to get location");
  }
  return data;
}

getLocationByIP().then(console.log).catch(console.error);
