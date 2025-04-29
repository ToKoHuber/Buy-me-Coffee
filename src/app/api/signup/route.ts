import { runQuery } from "@/utils/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { username, email, password } = await req.json();

    const checkUserQuery = `SELECT username FROM "Users" WHERE username='${username}';`;

    const user = await runQuery(checkUserQuery);

    if (user.length) {
      return new NextResponse(
        JSON.stringify({ error: "Бүртгэлтэй хэрэглэгч байна!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserQuery = `
      INSERT INTO "Users" (username, email, password)
      VALUES ($1, $2, $3);
    `;

    const newUser = await runQuery(createUserQuery, [
      username,
      email,
      hashedPassword,
    ]);

    console.log(newUser);

    return new NextResponse(
      JSON.stringify({
        message: "Амжилттай хэрэглэгч нэмэгдлээ!",
        user: newUser,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Алдаа гарлаа:", err);
    return new NextResponse(
      JSON.stringify({ error: "Серверийн алдаа гарлаа!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
