import db from "../../../db";
import { advocates } from "../../../db/schema";
import { AdvocateApiResponse } from "../../../types/advocate";

export async function GET(): Promise<Response> {
  try {
    const data = await db.select().from(advocates);
    
    return Response.json({ data } as AdvocateApiResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { error: 'Failed to fetch advocates' },
      { status: 500 }
    );
  }
}
