import { runQuery } from "@/utils/queryService";
import { NextResponse } from "next/server";

export async function PATCH(req: Request): Promise<NextResponse> {
  try {
    const { successMessage, userId } = await req.json();

    const updateUserProfileQuery = `
      UPDATE "Profile" SET "successMessage" = $1
      WHERE "userId" = $2
      RETURNING *`;

    const updatedUserProfile = await runQuery(updateUserProfileQuery, [
      successMessage,
      userId,
    ]);

    return new NextResponse(
      JSON.stringify({
        message: "Мэдээллийг амжилттай нэмлээ!",
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
