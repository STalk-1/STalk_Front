import { ImgProfile } from '@/assets/images';
import { cn } from '@/utils/cn';

import type { ChatMessageListProps } from './types';

function ChatMessageList({
  messages,
  messagesEndRef,
  currentUserName,
}: ChatMessageListProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-2 md:px-6">
      <div className="space-y-5 pb-4">
        {messages.map((message) => {
          const isMine = Boolean(
            currentUserName && message.author === currentUserName
          );

          return (
            <article
              key={message.id}
              className={cn(
                'flex items-center gap-2',
                isMine ? 'justify-end' : 'justify-start'
              )}
            >
              {!isMine ? (
                <ImgProfile className="h-8 w-8 shrink-0" aria-hidden="true" />
              ) : null}

              <div
                className={cn(
                  'flex max-w-[82%] flex-col md:max-w-[72%]',
                  isMine ? 'items-end' : 'items-start'
                )}
              >
                <span className="typo-12-medium mb-1 leading-none text-black">
                  {message.author}
                </span>

                <div
                  className={cn(
                    'flex items-end gap-2',
                    isMine ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <div
                    className={cn(
                      'min-h-8 rounded-2xl px-3 py-2 shadow-xl',
                      isMine
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

              {isMine ? (
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
