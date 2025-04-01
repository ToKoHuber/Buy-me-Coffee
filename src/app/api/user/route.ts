import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(): Promise<NextResponse> {
  try {
    // const user = await runQuery<{ id: number; name: string; password: number }>(
    //   `CREATE TABLE "public"."User" ("id" integer PRIMARY KEY,"name" varchar NOT NULL,"password" integer);`
    // );
    //     const user = await runQuery(`
    //   CREATE TABLE IF NOT EXISTS "public"."User" (
    //     "id" SERIAL PRIMARY KEY,
    //     "email" VARCHAR NOT NULL UNIQUE,
    //     "password" VARCHAR NOT NULL,
    //     "username" VARCHAR NOT NULL UNIQUE,
    //     "receivedDonations" INTEGER DEFAULT 0,
    //     "createdAt" TIMESTAMP DEFAULT now(),
    //     "profile" INTEGER DEFAULT 0,
    //     "bankCard" INTEGER DEFAULT 0,
    //     "updatedAt" TIMESTAMP DEFAULT now()
    //   );
    // `);
    // const incomingName = "boldo";
    // const getUser = `SELECT name,password FROM "User" WHERE name='${incomingName}`;
    const getUser = `SELECT * FROM "public"."User"`;
    const user = await runQuery(getUser);

    console.log("user", user);
    if (user.length <= 0) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ users: user }));
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { email, password, username, receivedDonations, profile, bankCard } =
      await request.json();

    if (!email || !password || !username) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Insert the new user into the database with parameterized query
    const query = `
    INSERT INTO "public"."User" 
    ("email", "password", "username") 
    VALUES ($1, $2, $3) 
    RETURNING *;
    `;
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [email, hashedPassword, username];

    const user = await runQuery(query, values);

    return new NextResponse(JSON.stringify({ user }), {
      status: 201,
    });
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to post new user" }),
      {
        status: 500,
      }
    );
  }
}
