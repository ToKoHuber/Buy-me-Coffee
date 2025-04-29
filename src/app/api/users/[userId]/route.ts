import { runQuery } from "@/utils/queryService";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  const userId = params.userId;

  try {
    const getUserQuery = `SELECT 
                              "Users"."id",
                              "Users"."email",
                              "Users"."username",
                            
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
                            
                            WHERE "Users"."id" = $1
                            
                            GROUP BY 
                              "Users"."id",
                              "Users"."email",
                              "Users"."username",
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

    const foundUser = await runQuery<any>(getUserQuery, [userId]);

    if (foundUser.length === 0) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    return NextResponse.json({ data: foundUser[0] });
  } catch (err) {
    console.error("Failed to run query:", err);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
