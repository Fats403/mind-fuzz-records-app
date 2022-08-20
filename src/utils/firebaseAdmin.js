import * as firebaseAdmin from "firebase-admin";

const projectId = process.env.PROJECT_ID;

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.PRIVATE_KEY?.replace("\\n", "\n"),
      clientEmail: process.env.CLIENT_EMAIL,
      projectId,
    }),
    databaseURL: `https://${projectId}.firebaseio.com`,
  });
}

export { firebaseAdmin };
