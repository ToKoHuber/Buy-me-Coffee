import { runQuery } from "@/utils/queryService";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      amount,
      recipientid,
      donorid,
      specialmessage,
      socialMediaURL,
      donorImage,
    } = await req.json();

    const findUserQuery = `SELECT * FROM "Users" WHERE id = $1`;

    const recipientUser = await runQuery(findUserQuery, [recipientid]);

    if (recipientUser.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Хэрэглэгч олдсонгүй!" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    let donorname = "";

    const findUserQuery2 = `SELECT * FROM "Users" WHERE id = $1`;
    const donorUser = await runQuery<{ username: string }>(findUserQuery2, [
      donorid,
    ]);
    if (donorUser.length > 0) {
      donorname = donorUser[0].username;
    }

    const updateDonorCardQuery = `
      INSERT INTO "Donations" ("amount", "recipientid", "donorid", "donorname", "specialmessage", "socialurlorbuymeacoffee", "donorimage")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;

    const donation = await runQuery(updateDonorCardQuery, [
      amount,
      recipientid,
      donorid,
      donorname,
      specialmessage,
      socialMediaURL,
      donorImage,
    ]);

    return new NextResponse(
      JSON.stringify({
        message: "Хандивын мэдээллийг амжилттай нэмлээ!",
        donation: donation,
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
