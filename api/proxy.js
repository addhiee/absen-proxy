export default async function handler(req, res) {
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const response = await fetch("https://script.google.com/macros/s/AKfycbxtBfvnusK1O1cLYiqFj2GNiSkYcr74t5lhvMgp5XYmomHv0ow3hpifKEdvGU0YVkc/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  const result = await response.text();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send(result);
}
