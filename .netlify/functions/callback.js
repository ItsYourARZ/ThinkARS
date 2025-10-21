import fetch from "node-fetch";
import querystring from "querystring";

export async function handler(event, context) {
  const code = event.queryStringParameters.code;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = "https://anirudh-rajesh.netlify.app/.netlify/functions/callback";

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    },
    body: querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    }),
  };
}
