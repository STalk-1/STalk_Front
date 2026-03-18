import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatHeader from '@/components/chat/Header';
import ChatInput from '@/components/chat/Input';
import ChatMessageList from '@/components/chat/MessageList';
import type { ChatMessage } from '@/components/chat/MessageList/types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: 'sender',
    author: 'S_jung',
    text: '실시간 채팅중 실시간 채팅중',
    time: '10:25',
  },
  {
    id: 2,
    sender: 'sender',
    author: 'S_jung',
    text: '실시간 채팅중 실시간 채팅중',
    time: '10:25',
  },
  {
    id: 3,
    sender: 'sender',
    author: '나',
    text: '실시간 채팅중 실시간 채팅중',
    time: '10:25',
  },
  {
    id: 4,
    sender: 'sender',
    author: '나',
    text: '실시간 채팅중 실시간 채팅중',
    time: '10:25',
  },
  {
    id: 5,
    sender: 'sender',
    author: 'S_jung',
    text: '실시간 채팅중 실시간 채팅중실시간채팅중 실시간채팅중',
    time: '10:25',
  },
];

const QUICK_REPLIES = [
  '실시간 채팅중 실시간 채팅중',
  '실시간 채팅중 실시간 채팅중실시간채팅중',
  '실시간 채팅중 실시간 채팅중',
];

function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages]);

  const nextId = useMemo(
    () =>
      messages.reduce((maxId, message) => Math.max(maxId, message.id), 0) + 1,
    [messages]
  );

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = {
      id: nextId,
      sender: 'sender',
      author: '나',
      text: trimmed,
      time: '10:25',
    };

    const botReply: ChatMessage = {
      id: nextId + 1,
      sender: 'sender',
      author: 'S_jung',
      text: QUICK_REPLIES[(nextId - 1) % QUICK_REPLIES.length],
      time: '10:25',
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput('');
  };

  return (
    <main className="min-h-screen bg-white md:bg-[#f5f6f8]">
      <section className="mx-auto flex min-h-screen w-full max-w-300 flex-col bg-white md:min-h-dvh">
        <div className="flex min-h-screen flex-1 flex-col bg-white">
          <ChatHeader
            title="삼성전자"
            subtitle="KOSPI 005930"
            statusLabel="실시간 채팅"
            audienceLabel="12명 접속중"
            onBack={() => navigate(-1)}
          />

          <section className="flex min-h-0 flex-1 flex-col px-2 pt-3 md:px-6 md:pt-4">
            <ChatMessageList
              messages={messages}
              messagesEndRef={messagesEndRef}
            />
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSend}
              placeholder="삼성전자에 대한 의견을 공유하세요."
            />
          </section>
        </div>
      </section>
    </main>
  );
}

export default ChatPage;
