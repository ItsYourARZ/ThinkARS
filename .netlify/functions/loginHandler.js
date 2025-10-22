export async function handler(event) {
  try {
    const { uid, email } = JSON.parse(event.body);
    console.log("User logged in:", uid, email);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Welcome back, ${email}!` }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
