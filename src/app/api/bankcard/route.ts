import { runQuery } from "@/utils/queryService";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      country,
      firstName,
      lastName,
      cardNumber,
      month,
      year,
      cvc,
      userId,
    } = await req.json();

    const expiryDate = `${year}-${month}-01`;

    const updateBankCardQuery = `
      INSERT INTO "BankCards" ("country", "firstName", "lastName", "cardNumber", "expiryDate", "cvc", "userId")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;

    const userBankCard = await runQuery(updateBankCardQuery, [
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      cvc,
      userId,
    ]);

    return new NextResponse(
      JSON.stringify({
        message: "Картын мэдээллийг амжилттай нэмлээ!",
        profile: userBankCard,
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

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const {
      country,
      firstName,
      lastName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc,
      userId,
    } = await req.json();

    const monthNumber = new Date(`${expiryMonth} 1, 2000`).getMonth() + 1;
    const monthNumberString = String(monthNumber).padStart(2, "0");

    const expiryDate = `${expiryYear}-${monthNumberString}-01`;

    const updateBankCardQuery = `
      UPDATE "BankCards" SET "country" = $1, "firstName" = $2, "lastName" = $3, "cardNumber" = $4, "expiryDate" = $5, "cvc" = $6
      WHERE "BankCards"."userId" = $7
      RETURNING *`;

    const userBankCard = await runQuery(updateBankCardQuery, [
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      cvc,
      userId,
    ]);

    return new NextResponse(
      JSON.stringify({
        message: "Картын мэдээллийг амжилттай шинэчиллээ!",
        profile: userBankCard,
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
