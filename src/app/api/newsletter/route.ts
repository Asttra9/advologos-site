import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await db.newsletterSignup.findUnique({
      where: { email: trimmedEmail },
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { success: true, message: 'Este e-mail já está inscrito.' },
          { status: 200 }
        );
      }
      // Re-activate if previously unsubscribed
      await db.newsletterSignup.update({
        where: { email: trimmedEmail },
        data: { active: true },
      });
      return NextResponse.json(
        { success: true, message: 'Inscrição reativada com sucesso.' },
        { status: 200 }
      );
    }

    // Create new subscription
    await db.newsletterSignup.create({
      data: { email: trimmedEmail },
    });

    return NextResponse.json(
      { success: true, message: 'Inscrito com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente.' },
      { status: 500 }
    );
  }
}
