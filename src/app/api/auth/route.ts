import { getUsers } from "@/back_end/users";

export async function GET() {
  const users = await getUsers();
  return new Response(JSON.stringify({ data: users }));
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log({ body });
  return new Response("getting users");
}
