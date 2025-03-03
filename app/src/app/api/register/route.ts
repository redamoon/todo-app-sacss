// app/api/register/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'アカウント作成中にエラーが発生しました' },
        { status: response.status }
      );
    }

    // アクセストークンをレスポンスヘッダーに付与
    const headers = new Headers();
    if (data.accessToken) {
      headers.set('Authorization', `Bearer ${data.accessToken}`);
    }

    headers.append(
      'Set-Cookie',
      `accessToken=${data.accessToken}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );
    headers.append(
      'Set-Cookie',
      `userId=${data.id}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    return NextResponse.json(data, { status: 201, headers });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'アカウント作成中にエラーが発生しました' },
      { status: 500 }
    );
  }
}