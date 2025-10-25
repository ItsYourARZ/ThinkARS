import fs from "fs";
import path from "path";

const filePath = path.join("/tmp", "visitors.json");

export async function handler(event, context) {
  // Initialize counter if not exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ count: 0 }));
  }

  // Read current count
  let data = JSON.parse(fs.readFileSync(filePath));
  data.count++;

  // Save new count
  fs.writeFileSync(filePath, JSON.stringify(data));

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitors: data.count }),
  };
}
