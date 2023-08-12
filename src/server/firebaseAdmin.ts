import * as admin from 'firebase-admin';
import { env } from '~/env.mjs';
if (!admin.apps.length) {
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert({
      clientEmail: env.CLIENT_EMAIL,
      privateKey: env.PRIVATE_KEY,
      projectId: env.PROJECT_ID
    }),
  });
}
export const firestore = admin.firestore();
export const firebaseAuth = admin.auth()
export default admin;