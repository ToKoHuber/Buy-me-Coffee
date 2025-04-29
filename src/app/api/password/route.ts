import { runQuery } from "@/utils/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(req: Request): Promise<NextResponse> {
  try {
    const { password, userId } = await req.json();

    console.log(password, userId);

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUserProfileQuery = `
      UPDATE "Users" SET "password" = $1
      WHERE "id" = $2
      RETURNING *`;

    const updatedUserProfile = await runQuery(updateUserProfileQuery, [
      hashedPassword,
      userId,
    ]);

    return new NextResponse(
      JSON.stringify({
        message: "Нууц үгийг амжилттай солилоо!",
        profile: updatedUserProfile,
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
