import { getFirestore } from "@firebase/firestore";
import { useFirebaseApp, FirestoreProvider as Provider } from "reactfire"

export function FirestoreProvider({ children }: { children: React.ReactNode }) {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <Provider sdk={firestoreInstance} >
      {children}
    </Provider>
  );
}