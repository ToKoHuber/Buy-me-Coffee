import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username } = req.body;

  try {
    // Query to check if username exists
    const result = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (result.rowCount > 0) {
      return res
        .status(400)
        .json({ available: false, message: "Username is taken" });
    }

    return res
      .status(200)
      .json({ available: true, message: "Username is available" });
  } catch (error) {
    return res.status(500).json({ error: "Database error", details: error });
  }
}
