import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface SessionPayload {
  exp: number;
  nonce: string;
}

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

export const SESSION_COOKIE_NAME = 'advologos_admin_session';
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_TTL_MS / 1000,
};

export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function getAdminPasswordHash(): string {
  const raw = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (raw) {
    return raw;
  }

  if (process.env.NODE_ENV !== 'production') {
    return hashPassword('advologos2025');
  }

  throw new Error('ADMIN_PASSWORD_HASH is not configured.');
}

function getAdminSessionSecret(): string {
  const raw = process.env.ADMIN_SESSION_SECRET?.trim();

  if (raw) {
    return raw;
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'advologos-dev-session-secret';
  }

  throw new Error('ADMIN_SESSION_SECRET is not configured.');
}

function signSessionBody(body: string): string {
  return createHmac('sha256', getAdminSessionSecret()).update(body).digest('base64url');
}

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a, 'utf8');
  const bBuffer = Buffer.from(b, 'utf8');

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

function encodeSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = signSessionBody(body);
  return `${body}.${signature}`;
}

function decodeSession(token: string): SessionPayload | null {
  const [body, signature, ...rest] = token.split('.');

  if (!body || !signature || rest.length > 0) {
    return null;
  }

  try {
    const expectedSignature = signSessionBody(body);

    if (!safeEqual(signature, expectedSignature)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as Partial<SessionPayload>;

    if (typeof payload.exp !== 'number' || typeof payload.nonce !== 'string') {
      return null;
    }

    return {
      exp: payload.exp,
      nonce: payload.nonce,
    };
  } catch {
    return null;
  }
}

export function createSession(): { token: string; cookieValue: string } {
  const token = encodeSession({
    exp: Date.now() + SESSION_TTL_MS,
    nonce: randomBytes(16).toString('hex'),
  });

  return {
    token,
    cookieValue: token,
  };
}

export function validateSession(token: string | null): boolean {
  if (!token) {
    return false;
  }

  const payload = decodeSession(token);

  if (!payload) {
    return false;
  }

  return payload.exp > Date.now();
}

export function destroySession(_token: string): void {}

export async function assertAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;

  if (validateSession(token)) {
    return null;
  }

  return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
}
