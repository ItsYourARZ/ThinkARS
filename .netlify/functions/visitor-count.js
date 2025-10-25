export async function handler(event) {
  const fs = await import("fs");
  const filePath = "/tmp/visitors.json";

  // Read or initialize count
  let count = 0;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath));
    count = data.count;
  } else {
    fs.writeFileSync(filePath, JSON.stringify({ count }));
  }

  // If this is a "new visit" (first page load), increment
  const increment = event.queryStringParameters?.increment === "true";
  if (increment) {
    count++;
    fs.writeFileSync(filePath, JSON.stringify({ count }));
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitors: count }),
  };
}
