export async function handler(event, context) {
  try {
    const { uid, firstname, lastname, email } = JSON.parse(event.body);

    console.log("New user registered:", uid, firstname, lastname, email);

    const firebaseConfig = {
    apiKey: "AIzaSyAARY3XCb_p0KpVPRsUh-zN8DY_OxkgisE",
    authDomain: "the-ars-team.firebaseapp.com",
    projectId: "the-ars-team",
    storageBucket: "the-ars-team.firebasestorage.app",
    messagingSenderId: "247839744361",
    appId: "1:247839744361:web:1d8f1e637659d5efb71df8",
    measurementId: "G-9KR4V2EMHJ"
  };

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Welcome ${firstname}! Your account has been created.` }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
