import { NextResponse } from 'next/server';
import userSession from '@/actions/userSession';

export async function GET() {
  const user = await userSession();
  return NextResponse.json({ user });
}
