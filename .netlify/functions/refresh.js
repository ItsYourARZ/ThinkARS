import fetch from "node-fetch";
import querystring from "querystring";

export async function handler(event, context) {
  const refresh_token = event.queryStringParameters.refresh_token;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      access_token: data.access_token,
    }),
  };
}
