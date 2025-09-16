// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { interviewQuestions } from '@/lib/questions';
import OpenAI from 'openai';

// Inicializa o cliente da OpenAI com a chave diretamente
const openai = new OpenAI({
  apiKey: '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',
});

export async function POST(req: Request) {
  try {
    const { userResponse, currentQuestionIndex } = await req.json();

    // Lógica para determinar a próxima pergunta ou finalizar
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < interviewQuestions.length) {
      const nextQuestion = interviewQuestions[nextQuestionIndex];
      
      // Opcional: Você pode usar a IA para criar uma transição mais fluida
      // Exemplo: "Obrigado por compartilhar sobre [tópico da resposta anterior]. Agora, fale sobre..."
      // Por enquanto, vamos retornar a próxima pergunta diretamente.
      return NextResponse.json({ nextMessage: nextQuestion, isFinal: false });

    } else {
      // Mensagem final quando todas as perguntas forem respondidas
      const finalMessage = "Incrível! Chegamos ao final da nossa entrevista. Muito obrigado por compartilhar sua jornada. Em breve, sua autobiografia estará tomando forma.";
      return NextResponse.json({ nextMessage: finalMessage, isFinal: true });
    }

  } catch (error) {
    console.error('[CHAT_API_ERROR]', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}