import { getBankCards } from "@/back_end/bankcards";

export async function GET() {
  const users = await getBankCards();
  return new Response(JSON.stringify({ data: users }));
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log({ body });
  return new Response("getting bank cards");
}
