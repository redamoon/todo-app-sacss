// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('リクエスト受信');
    const body = await request.json();
    console.log('リクエストボディ:', body);

    // バックエンドサービスへのリクエスト
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('バックエンドのレスポンスステータス:', response.status);
    const data = await response.json();
    console.log('バックエンドのレスポンスデータ:', data);

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
      `userId=${data.user.id}; HttpOnly; Path=/; SameSite=Strict; Secure`
    );

    return NextResponse.json(data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error('エラーの詳細:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}