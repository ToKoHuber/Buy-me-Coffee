import { runQuery } from "@/utils/queryService";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const getAllUser = `SELECT 
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

    const allUsers = await runQuery<any>(getAllUser);

    if (allUsers.length === 0) {
      return new NextResponse(JSON.stringify({ error: "No users found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(allUsers), {
      status: 200,
    });
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}
