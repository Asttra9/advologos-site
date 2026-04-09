import { NextResponse } from 'next/server';
import { assertAdminSession } from '@/lib/admin-auth';
import { db } from '@/lib/db';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorizedResponse = await assertAdminSession();

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }

    const { id } = await params;

    const signup = await db.newsletterSignup.findUnique({
      where: { id },
    });

    if (!signup) {
      return NextResponse.json(
        { error: 'Signup not found.' },
        { status: 404 }
      );
    }

    await db.newsletterSignup.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete newsletter error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unauthorizedResponse = await assertAdminSession();

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }

    const { id } = await params;
    const body = await request.json();
    const { active } = body as { active?: boolean };

    if (typeof active !== 'boolean') {
      return NextResponse.json(
        { error: 'Campo "active" obrigatório (boolean).' },
        { status: 400 }
      );
    }

    const signup = await db.newsletterSignup.findUnique({
      where: { id },
    });

    if (!signup) {
      return NextResponse.json(
        { error: 'Signup not found.' },
        { status: 404 }
      );
    }

    await db.newsletterSignup.update({
      where: { id },
      data: { active },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Toggle newsletter error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
