// src/components/chat-message.tsx
type ChatMessageProps = {
  text: string;
  sender: 'user' | 'ai';
  isLoading?: boolean;
};

export function ChatMessage({ text, sender, isLoading = false }: ChatMessageProps) {
  const isUser = sender === 'user';
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-prose px-4 py-3 rounded-2xl ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
        {isLoading ? (
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 bg-gray-300 rounded-full animate-pulse delay-0"></span>
            <span className="h-2 w-2 bg-gray-300 rounded-full animate-pulse delay-150"></span>
            <span className="h-2 w-2 bg-gray-300 rounded-full animate-pulse delay-300"></span>
          </div>
        ) : (
          <p className="text-sm md:text-base">{text}</p>
        )}
      </div>
    </div>
  );
}