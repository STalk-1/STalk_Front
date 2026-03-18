import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getChatRoomCount, getChatRoomInfo } from '@/apis/chat/chat';
import { getMe } from '@/apis/users/me';
import ChatHeader from '@/components/chat/Header';
import ChatInput from '@/components/chat/Input';
import ChatMessageList from '@/components/chat/MessageList';
import type { ChatMessage } from '@/components/chat/MessageList/types';
import { useChatSocket } from '@/hooks/useChatSocket';
import type { ChatMessagePayload } from '@/types/chat';

const DEFAULT_CHAT_ROOM = {
  symbol: '005930',
  name: '삼성전자',
  market: 'KOSPI',
  count: 12,
};
const EMPTY_MESSAGES: ChatMessage[] = [];

function ChatPage() {
  const navigate = useNavigate();
  const { symbol: symbolParam } = useParams();
  const [messagesBySymbol, setMessagesBySymbol] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [input, setInput] = useState('');
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [roomInfo, setRoomInfo] = useState({
    symbol: DEFAULT_CHAT_ROOM.symbol,
    name: DEFAULT_CHAT_ROOM.name,
    market: DEFAULT_CHAT_ROOM.market,
  });
  const [audienceCount, setAudienceCount] = useState(DEFAULT_CHAT_ROOM.count);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const symbol = symbolParam ?? DEFAULT_CHAT_ROOM.symbol;
  const messages = messagesBySymbol[symbol] ?? EMPTY_MESSAGES;
  const { isConnected, sendMessage } = useChatSocket(
    symbol,
    (payload: ChatMessagePayload) => {
      setMessagesBySymbol((prev) => {
        const currentMessages = prev[payload.symbol] ?? [];
        if (
          currentMessages.some((message) => message.id === payload.messageId)
        ) {
          return prev;
        }

        return {
          ...prev,
          [payload.symbol]: [
            ...currentMessages,
            {
              id: payload.messageId,
              sender: 'sender',
              author: payload.sender,
              text: payload.content,
              time: payload.sentAt,
            },
          ],
        };
      });
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages]);

  useEffect(() => {
    let mounted = true;

    const fetchMe = async () => {
      try {
        const me = await getMe();
        if (!mounted) {
          return;
        }

        setCurrentUserName(me.nickname || null);
      } catch {
        if (!mounted) {
          return;
        }

        setCurrentUserName(null);
      }
    };

    fetchMe();

    return () => {
      mounted = false;
    };
  }, []);

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
    if (!trimmed || !currentUserName) {
      return;
    }

    const didSend = sendMessage({
      symbol,
      sender: currentUserName,
      content: trimmed,
    });

    if (didSend) {
      setInput('');
    }
  };

  return (
    <main className="min-h-screen bg-white md:bg-[#f5f6f8]">
      <section className="mx-auto flex min-h-screen w-full max-w-300 flex-col bg-white md:min-h-dvh">
        <div className="flex min-h-screen flex-1 flex-col bg-white">
            <ChatHeader
            title={roomInfo.name}
            subtitle={`${roomInfo.market} ${roomInfo.symbol}`}
            statusLabel={isConnected ? '실시간 채팅' : '채팅 연결 중'}
            audienceLabel={`${audienceCount}명 접속중`}
            onBack={() => navigate(-1)}
          />

          <section className="flex min-h-0 flex-1 flex-col pt-3 md:pt-4">
            <ChatMessageList
              messages={messages}
              messagesEndRef={messagesEndRef}
              currentUserName={currentUserName}
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
