// src/app/api/generate-pdf/route.ts
import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { AutobiographyDocument } from '../../components/AutobiographyDocument';

export async function POST(req: Request) {
  try {
    console.log('PDF generation started');
    const body = await req.json();
    const { messages } = body;

    console.log('Messages received:', messages.length);

    // Valida se há mensagens suficientes
    if (!messages || messages.length < 2) {
      throw new Error('Not enough messages to generate PDF');
    }

    // Processa as mensagens para extrair os dados necessários
    const authorName = messages[1].text; // Resposta à primeira pergunta
    const title = `A História de ${authorName}`;

    console.log('Author name:', authorName);

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
    
    console.log('Chapters count:', chapters.length);
    
    const docData = { authorName, title, chapters };

    console.log('Starting PDF render...');
    // Renderiza o documento PDF para um stream
    const stream = await renderToStream(
      <AutobiographyDocument data={docData} />
    );

    console.log('PDF render completed, returning response');

    // Retorna o stream como uma resposta com os headers corretos para download
    return new Response(stream as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="autobiografia_${authorName.replace(/\s/g, '_')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      message: 'Failed to generate PDF', 
      error: error.message 
    }, { status: 500 });
  }
}