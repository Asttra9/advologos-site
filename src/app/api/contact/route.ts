import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z
    .string()
    .min(10, 'WhatsApp deve ter pelo menos 10 dígitos')
    .regex(/^[+\d\s()-]+$/, 'Formato de telefone inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues?.[0];
      return NextResponse.json(
        { error: firstError?.message || 'Dados inválidos' },
        { status: 400 }
      );
    }

    const { name, email, whatsapp, message } = result.data;

    await db.contactSubmission.create({
      data: { name, email, whatsapp, message },
    });

    return NextResponse.json(
      { success: true, message: 'Mensagem recebida com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente.' },
      { status: 500 }
    );
  }
}
