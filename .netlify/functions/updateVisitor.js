// netlify/functions/updateVisitor.js
import admin from "firebase-admin";

// Initialize Firebase Admin SDK once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    })
  });
}

const db = admin.firestore();

export async function handler(event, context) {
  try {
    const counterRef = db.collection("visits").doc("counter");
    const snap = await counterRef.get();

    if (snap.exists) {
      await counterRef.update({ count: admin.firestore.FieldValue.increment(1) });
    } else {
      await counterRef.set({ count: 1 });
    }

    const updated = await counterRef.get();

    return {
      statusCode: 200,
      body: JSON.stringify({ count: updated.data().count })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
