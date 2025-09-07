import * as admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";
import "server-only";

const cert: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const firebaseAdmin =
  admin.apps[0] ??
  admin.initializeApp({
    credential: admin.credential.cert(cert),
  });

export const firebaseAdminAuth = firebaseAdmin.auth();
