import { runQuery } from "@/utils/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

type User = {
  id: number;
  price: number | null;
  password: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  email: string;
};

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = await req.json();

    const checkEmailQuery = `SELECT email FROM "Users" WHERE email='${email}';`;

    const isEmailValid = await runQuery(checkEmailQuery);

    if (isEmailValid.length == 0) {
      return new NextResponse(
        JSON.stringify({ error: "Бүртгэлгүй хэрэглэгч байна!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const foundUserQuery = `SELECT 
                              "Users"."id",
                              "Users"."email",
                              "Users"."username",
                              "Users"."password",
                            
                              json_build_object(
                                'name', "Profile"."name",
                                'about', "Profile"."about",
                                'avatarImage', "Profile"."avatarImage",
                                'socialMediaURL', "Profile"."socialMediaURL",
                                'backgroundImage', "Profile"."backgroundImage",
                                'successMessage', "Profile"."successMessage"
                              ) AS profile,
                            
                              json_build_object(
                                'country', bc."country",
                                'firstName', bc."firstName",
                                'lastName', bc."lastName",
                                'cardNumber', bc."cardNumber",
                                'expiryDate', bc."expiryDate",
                                'cvc', bc."cvc"
                              ) AS bankCard,
                            
                              COALESCE(json_agg(json_build_object(
                                'donorId', "Donations"."donorid",
                                'donorName', "Donations"."donorname",
                                'donorImage', "Donations"."donorimage",
                                'recipientId', "Donations"."recipientid",
                                'amount', "Donations"."amount",
                                'specialMessage', "Donations"."specialmessage",
                                'socialURLOrBuyMeACoffee', "Donations"."socialurlorbuymeacoffee",
                                'createdAt', "Donations"."created_at"
                              )) FILTER (WHERE "Donations"."id" IS NOT NULL), '[]') AS donations
                            
                            FROM "Users"
                            
                            LEFT JOIN "Profile" ON "Users"."id" = "Profile"."userId"
                            
                            LEFT JOIN LATERAL (
                              SELECT * FROM "BankCards"
                              WHERE "BankCards"."userId" = "Users"."id"
                              ORDER BY "BankCards"."id" ASC
                              LIMIT 1
                            ) bc ON true
                            
                            LEFT JOIN "Donations" ON "Donations"."recipientid" = "Users"."id"
                            
                            WHERE "Users"."email" = $1
                            
                            GROUP BY 
                              "Users"."id",
                              "Users"."email",
                              "Users"."username",
                              "Users"."password",
                              "Profile"."name",
                              "Profile"."about",
                              "Profile"."avatarImage",
                              "Profile"."socialMediaURL",
                              "Profile"."backgroundImage",
                              "Profile"."successMessage",
                              bc."country",
                              bc."firstName",
                              bc."lastName",
                              bc."cardNumber",
                              bc."expiryDate",
                              bc."cvc";`;

    const foundUser = await runQuery<User>(foundUserQuery, [email]);

    const isPasswordValid = bcrypt.compareSync(password, foundUser[0].password);

    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ error: "Нууц үг буруу байна!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { password: _, ...userWithoutPassword } = foundUser[0];

    return new NextResponse(
      JSON.stringify({
        message: "Амжилттай нэвтэрлээ!",
        user: userWithoutPassword,
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
