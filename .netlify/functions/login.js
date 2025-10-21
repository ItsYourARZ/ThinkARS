import querystring from "querystring";

export async function handler(event, context) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = "https://your-site.netlify.app/.netlify/functions/callback";
  const scope = "user-read-private user-read-email";

  const url =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id,
      scope,
      redirect_uri,
    });

  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
  };
}
