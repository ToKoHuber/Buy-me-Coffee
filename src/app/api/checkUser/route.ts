import { runQuery } from "@/utils/queryService";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { username } = await req.json();

    const checkUserQuery = `SELECT username FROM "Users" WHERE username='${username}';`;

    const user = await runQuery(checkUserQuery);

    if (user.length) {
      return new NextResponse(
        JSON.stringify({ error: "Энэ нэрийг ашиглах боломжгүй!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Энэ нэрийг ашиглах боломжтой",
        username: username,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Алдаа гарлаа:", err);
    return new NextResponse(
      JSON.stringify({ error: "Серверийн алдаа гарлаа!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
