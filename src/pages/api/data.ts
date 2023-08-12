import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { uploadData } from "~/server/db/db";
import { dataRequestSchema } from "~/server/models/reqData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("INCOMING REQUEST", req.body);
    
    if (req.method == "POST") {
      const { distance } = await dataRequestSchema.parseAsync(req.body);
      await uploadData({
        distance,
        timestamp: Date.now()
      });
      console.log("Added", distance);
      
      res.status(200).send("Success!");
      return;
    }
    res.status(403).send("Cannot perform this operation");
  } catch (error) {
    console.log("Error creating data", error);
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Error on data", error });
      return;
    }
    res.status(500).send("Error connecting to server");
  }
}