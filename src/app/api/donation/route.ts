import { getDonations } from "@/back_end/donations";

export async function GET() {
  const donation = await getDonations();
  return new Response(JSON.stringify({ data: donation }));
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log({ body });
  return new Response("getting donation data");
}
