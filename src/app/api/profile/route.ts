import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    // Create the Profile table if it doesn't exist
    const profile = await runQuery(`
      CREATE TABLE IF NOT EXISTS "public"."Profile" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "about" TEXT,
        "avatarImage" TEXT,
        "socialMediaURL" TEXT,
        "backgroundImage" TEXT,
        "successMessage" TEXT,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
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
    const {
      name,
      about,
      avatarImage,
      socialMediaURL,
      backgroundImage,
      successMessage,
    } = await request.json();

    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required" }), {
        status: 400,
      });
    }

    const query = `
      INSERT INTO "public"."Profile" 
      ("name", "about", "avatarImage", "socialMediaURL", "backgroundImage", "successMessage", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
      RETURNING *;
    `;
    const values = [
      name,
      about || "",
      avatarImage || "",
      socialMediaURL || "",
      backgroundImage || "",
      successMessage || "",
    ];

    const profiles = await runQuery(query, values);

    return new NextResponse(JSON.stringify({ profiles }), {
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
