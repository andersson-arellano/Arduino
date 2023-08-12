import { firestore } from "../firebaseAdmin";
import { Data } from "../models/data";

export async function uploadData(data: Data) {
  const dataToUpdate = {
    distance: data.distance,
    timestamp: data.timestamp
  };
  const batch = firestore.batch();
  batch.set(firestore.collection("data").doc(), dataToUpdate);
  batch.update(firestore.collection("data").doc("currentData"), dataToUpdate);
  
  return await batch.commit();
}