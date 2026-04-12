import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import {
  verifyPassword,
  getAdminPasswordHash,
  createSession,
  validateSession,
  destroySession,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from '@/lib/admin-auth';

// ── Rate limiting (in-memory, 5 attempts per IP per 15 min) ──
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const entry = loginAttempts.get(ip);
  if (!entry) return false;
  const elapsed = Date.now() - entry.firstAttempt;
  if (elapsed > WINDOW_MS) {
    loginAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string): void {
  const entry = loginAttempts.get(ip);
  if (!entry || Date.now() - entry.firstAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: Date.now() });
  } else {
    entry.count++;
  }
}

export async function POST(request: Request) {
  // Rate limit check
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
      { status: 429 }
    );
  }
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
      recordFailedAttempt(ip);
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
