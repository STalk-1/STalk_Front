import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getChatRoomCount, getChatRoomInfo } from '@/apis/chat/chat';
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

const DEFAULT_CHAT_ROOM = {
  symbol: '005930',
  name: '삼성전자',
  market: 'KOSPI',
  count: 12,
};

function ChatPage() {
  const navigate = useNavigate();
  const { symbol: symbolParam } = useParams();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [roomInfo, setRoomInfo] = useState({
    symbol: DEFAULT_CHAT_ROOM.symbol,
    name: DEFAULT_CHAT_ROOM.name,
    market: DEFAULT_CHAT_ROOM.market,
  });
  const [audienceCount, setAudienceCount] = useState(DEFAULT_CHAT_ROOM.count);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const symbol = symbolParam ?? DEFAULT_CHAT_ROOM.symbol;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages]);

  useEffect(() => {
    let mounted = true;

    const fetchChatRoomMeta = async () => {
      try {
        const [info, count] = await Promise.all([
          getChatRoomInfo(symbol),
          getChatRoomCount(symbol),
        ]);

        if (!mounted) {
          return;
        }

        setRoomInfo(info);
        setAudienceCount(count.count);
      } catch {
        if (!mounted) {
          return;
        }

        setRoomInfo({
          symbol: DEFAULT_CHAT_ROOM.symbol,
          name: DEFAULT_CHAT_ROOM.name,
          market: DEFAULT_CHAT_ROOM.market,
        });
        setAudienceCount(DEFAULT_CHAT_ROOM.count);
      }
    };

    fetchChatRoomMeta();

    return () => {
      mounted = false;
    };
  }, [symbol]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    setMessages((prev) => {
      const nextId =
        prev.reduce((maxId, message) => Math.max(maxId, message.id), 0) + 1;

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

      return [...prev, userMessage, botReply];
    });
    setInput('');
  };

  return (
    <main className="min-h-screen bg-white md:bg-[#f5f6f8]">
      <section className="mx-auto flex min-h-screen w-full max-w-300 flex-col bg-white md:min-h-dvh">
        <div className="flex min-h-screen flex-1 flex-col bg-white">
          <ChatHeader
            title={roomInfo.name}
            subtitle={`${roomInfo.market} ${roomInfo.symbol}`}
            statusLabel="실시간 채팅"
            audienceLabel={`${audienceCount}명 접속중`}
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
