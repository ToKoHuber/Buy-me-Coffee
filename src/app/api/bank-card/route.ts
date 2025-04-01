import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    // Create the Profile table if it doesn't exist
    const profile = await runQuery(`
    CREATE TABLE IF NOT EXISTS "public"."BankCard" (
    "id" SERIAL PRIMARY KEY,
    "country" VARCHAR(100) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "cardNumber" VARCHAR(16) NOT NULL UNIQUE,
    "expiryDate" DATE NOT NULL,
    "userId" INT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now(),
    FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE
);
    `);

    return new NextResponse(JSON.stringify({ profiles: profile }), {
      status: 200,
    });
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}

// export async function GET_PROFILES(): Promise<NextResponse> {
//   try {
//     const getProfile = `SELECT * FROM "public"."Profile"`;
//     const profiles = await runQuery(getProfile);

//     if (profiles.length <= 0) {
//       return new NextResponse(JSON.stringify({ error: "No profiles found" }), {
//         status: 404,
//       });
//     }

//     return new NextResponse(JSON.stringify({ profiles }), {
//       status: 200,
//     });
//   } catch (err) {
//     console.error("Failed to run query:", err);
//     return new NextResponse(
//       JSON.stringify({ error: "Failed to fetch profiles" }),
//       {
//         status: 500,
//       }
//     );
//   }
// }

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { country, firstName, lastName, cardNumber, expiryDate, userId } =
      await request.json();

    if (
      !country ||
      !firstName ||
      !lastName ||
      !cardNumber ||
      !expiryDate ||
      !userId
    ) {
      return new NextResponse(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO "public"."BankCard" 
      ("country", "firstName", "lastName", "cardNumber", "expiryDate", "userId", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
      RETURNING *;
    `;

    const values = [
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      userId,
    ];

    const bankCard = await runQuery(query, values);

    return new NextResponse(JSON.stringify({ bankCard }), {
      status: 201,
    });
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to post new profile" }),
      {
        status: 500,
      }
    );
  }
}
