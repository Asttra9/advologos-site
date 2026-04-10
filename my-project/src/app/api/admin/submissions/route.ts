import { NextResponse } from 'next/server';
import { assertAdminSession } from '@/lib/admin-auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const unauthorizedResponse = await assertAdminSession();

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }

    const [contacts, newsletters] = await Promise.all([
      db.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      db.newsletterSignup.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
    ]);

    const [contactTotal, newsletterTotal] = await Promise.all([
      db.contactSubmission.count(),
      db.newsletterSignup.count({ where: { active: true } }),
    ]);

    return NextResponse.json({
      contacts,
      newsletters,
      totals: {
        contacts: contactTotal,
        newsletters: newsletterTotal,
      },
    });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
