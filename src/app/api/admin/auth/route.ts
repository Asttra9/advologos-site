import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyPassword,
  getAdminPasswordHash,
  createSession,
  validateSession,
  destroySession,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body as { password?: string };

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Senha é obrigatória.' },
        { status: 400 }
      );
    }

    const expectedHash = getAdminPasswordHash();
    const isValid = verifyPassword(password, expectedHash);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Senha incorreta.' },
        { status: 401 }
      );
    }

    const { cookieValue } = createSession();

    const response = NextResponse.json(
      { success: true, message: 'Autenticado com sucesso.' },
      { status: 200 }
    );

    response.cookies.set(SESSION_COOKIE_NAME, cookieValue, SESSION_COOKIE_OPTIONS);

    return response;
  } catch (error) {
    console.error('Admin login error:', error);

    if (error instanceof Error && error.message.startsWith('ADMIN_')) {
      return NextResponse.json(
        { error: 'Painel administrativo não configurado.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const existingToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (existingToken) {
      destroySession(existingToken);
    }

    const response = NextResponse.json(
      { success: true, message: 'Sessão encerrada.' },
      { status: 200 }
    );

    response.cookies.delete(SESSION_COOKIE_NAME);

    return response;
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

/* Check auth status */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
    const isValid = validateSession(token);

    return NextResponse.json({ authenticated: isValid });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
