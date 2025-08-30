// src/app/api/generate-pdf/route.ts
import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { AutobiographyDocument } from '../../components/AutobiographyDocument';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // Processa as mensagens para extrair os dados necessários
    const authorName = messages[1].text; // Resposta à primeira pergunta
    const title = `A História de ${authorName}`;

    const chapters = [];
    // Começa do índice 2 para pular as perguntas e respostas iniciais
    for (let i = 2; i < messages.length; i += 2) {
      if (messages[i] && messages[i + 1]) {
        chapters.push({
          question: messages[i].text,
          answer: messages[i + 1].text,
        });
      }
    }
    
    const docData = { authorName, title, chapters };

    // Renderiza o documento PDF para um stream
    const stream = await renderToStream(
      <AutobiographyDocument data={docData} />
    );

    // Retorna o stream como uma resposta com os headers corretos para download
    return new Response(stream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="autobiografia_${authorName.replace(/\s/g, '_')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ message: 'Failed to generate PDF' }, { status: 500 });
  }
}