import { ImgProfile } from '@/assets/images';
import { cn } from '@/utils/cn';

import type { ChatMessageListProps } from './types';

function ChatMessageList({ messages, messagesEndRef }: ChatMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-2">
      <div className="space-y-5 pb-4">
        {messages.map((message) => {
          const isUser = message.sender === 'user';

          return (
            <article
              key={message.id}
              className={cn(
                'flex items-center gap-2',
                isUser ? 'justify-end' : 'justify-start'
              )}
            >
              {!isUser ? (
                <ImgProfile className="h-8 w-8 shrink-0" aria-hidden="true" />
              ) : null}

              <div
                className={cn(
                  'flex max-w-[82%] flex-col md:max-w-[72%]',
                  isUser ? 'items-end' : 'items-start'
                )}
              >
                <span className="typo-12-medium mb-1 leading-none text-black">
                  {message.author}
                </span>

                <div
                  className={cn(
                    'flex items-end gap-2',
                    isUser ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <div
                    className={cn(
                      'min-h-8 rounded-2xl px-3 py-2 shadow-[0_6px_18px_rgba(15,23,42,0.06)]',
                      isUser
                        ? 'rounded-tr-sm bg-green-500 text-white'
                        : 'bg-grey-50 text-grey-900 rounded-tl-sm'
                    )}
                  >
                    <p className="typo-14-regular leading-[1.45] break-words whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                  <span className="typo-10-regular text-grey-300 mb-1 leading-none">
                    {message.time}
                  </span>
                </div>
              </div>

              {isUser ? (
                <ImgProfile className="h-8 w-8 shrink-0" aria-hidden="true" />
              ) : null}
            </article>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatMessageList;
