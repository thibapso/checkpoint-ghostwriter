// src/components/chat-interface.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { interviewQuestions } from '@/lib/questions';
import { ChatMessage } from './chat-message';
import { MessageInput } from './message-input';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { text: interviewQuestions[0], sender: 'ai' },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading || isInterviewFinished) return;

    const newMessages: Message[] = [...messages, { text: userMessage, sender: 'user' }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userResponse: userMessage,
          currentQuestionIndex: currentQuestionIndex,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get next question');
      }

      const data = await response.json();
      
      setMessages((prev) => [...prev, { text: data.nextMessage, sender: 'ai' }]);

      if (data.isFinal) {
        setIsInterviewFinished(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } catch {
      const errorMessage = { text: "Desculpe, ocorreu um erro de conexão. Por favor, tente enviar sua resposta novamente.", sender: 'ai' as const };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePdf = async () => {
    setIsGeneratingPdf(true);
    try {
      console.log('Iniciando geração de PDF...');
      console.log('Mensagens para enviar:', messages);
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro do servidor:', errorData);
        throw new Error(`Erro do servidor: ${errorData.message || 'Resposta não foi OK'}`);
      }

      const blob = await response.blob();
      console.log('Blob criado, tamanho:', blob.size);
      
      if (blob.size === 0) {
        throw new Error('O PDF gerado está vazio');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      const disposition = response.headers.get('content-disposition');
      let filename = 'autobiografia.pdf';
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      console.log('PDF baixado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert(`Erro ao gerar PDF: ${errorMessage}`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
      <div ref={chatEndRef} className="flex-1 p-6 space-y-6 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender} text={msg.text} />
        ))}
        {isLoading && <ChatMessage sender="ai" text="..." isLoading={true} />}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700 bg-gray-800">
        {isInterviewFinished ? (
          <button
            onClick={handleGeneratePdf}
            disabled={isGeneratingPdf}
            className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold hover:from-green-700 hover:to-green-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isGeneratingPdf ? 'Gerando seu livro...' : 'Baixar Minha Autobiografia (PDF)'}
          </button>
        ) : (
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}