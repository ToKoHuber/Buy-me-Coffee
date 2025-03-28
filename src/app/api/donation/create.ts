import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { userId, amount, message } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO donations (user_id, amount, message) VALUES ($1, $2, $3) RETURNING *",
      [userId, amount, message]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error });
  }
}
