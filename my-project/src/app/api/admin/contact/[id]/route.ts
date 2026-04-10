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

    const submission = await db.contactSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found.' },
        { status: 404 }
      );
    }

    await db.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
