// app/api/items/route.js
import { connectToDB } from '@/lib/db';
import Item from '@/models/Item';

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const item = await Item.create(body);
    return Response.json({ item });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
