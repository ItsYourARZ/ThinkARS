export async function handler(event) {
  try {
    const { uid, firstname, lastname, email } = JSON.parse(event.body);
    console.log("New user:", firstname, lastname, email);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Welcome ${firstname}!` }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
