import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    // Create the Profile table if it doesn't exist
    const donation = await runQuery(`
CREATE TABLE IF NOT EXISTS "public"."Donation" (
    "id" SERIAL PRIMARY KEY,
    "amount" INT NOT NULL,
    "specialMessage" TEXT,
    "socialURLOrBuyMeACoffee" TEXT,
    "donorId" INT NOT NULL,
    "recipientId" INT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now()
);
    `);

    return new NextResponse(JSON.stringify({ profiles: donation }), {
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
    const {
      amount,
      specialMessage,
      socialURLOrBuyMeACoffee,
      donorId,
      recipientId,
    } = await request.json();

    if (!amount || !donorId || !recipientId) {
      return new NextResponse(
        JSON.stringify({
          error: "Amount, donorId, and recipientId are required",
        }),
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO "public"."Donation" 
      ("amount", "specialMessage", "socialURLOrBuyMeACoffee", "donorId", "recipientId", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
      RETURNING *;
    `;

    const values = [
      amount,
      specialMessage || "",
      socialURLOrBuyMeACoffee || "",
      donorId,
      recipientId,
    ];

    const donation = await runQuery(query, values);

    return new NextResponse(JSON.stringify({ donation }), {
      status: 201,
    });
  } catch (err) {
    console.error("Failed to create donation:", err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create donation" }),
      {
        status: 500,
      }
    );
  }
}
