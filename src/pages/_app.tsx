import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebaseClientCredentials.json";
import { type AppType } from "next/dist/shared/lib/utils";
import { useMemo } from "react";
import "~/styles/globals.css";
import 'tailwindcss/tailwind.css'
import { FirebaseAppProvider } from "reactfire";
import { FirestoreProvider } from "~/client/firestoreProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  const app = useMemo(() => initializeApp(firebaseConfig), []);
  return (
    <FirebaseAppProvider firebaseApp={app} suspense={true}>
      <FirestoreProvider>
        <Component {...pageProps} />
      </FirestoreProvider>
    </FirebaseAppProvider>
  );
};

export default MyApp;
