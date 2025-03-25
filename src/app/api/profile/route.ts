import { getProflies } from "../../../back_end/profiles";

export async function GET() {
  const profiles = await getProflies();
  return new Response(JSON.stringify({ data: profiles }));
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log({ body });
  return new Response("getting profiles");
}
