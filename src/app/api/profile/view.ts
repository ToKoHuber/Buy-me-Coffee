import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error });
  }
}
