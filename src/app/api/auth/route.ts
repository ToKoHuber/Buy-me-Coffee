import { getBankCards } from "@/back_end/bankcards";

export async function GET() {
  const profiles = await getBankCards();
  return new Response(JSON.stringify({ data: profiles }));
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log({ body });
  return new Response("getting profiles");
}
