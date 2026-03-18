import { ImgProfile } from '@/assets/images';

import type { ChatMessageListProps } from './types';

function ChatMessageList({ messages, messagesEndRef }: ChatMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-2">
      <div className="space-y-5 pb-4">
        {messages.map((message) => {
          return (
            <article key={message.id} className="flex items-center gap-2">
              <ImgProfile className="h-8 w-8 shrink-0" aria-hidden="true" />

              <div className="flex max-w-[82%] flex-col items-start md:max-w-[72%]">
                <span className="typo-12-medium mb-1 leading-none text-black">
                  {message.author}
                </span>

                <div className="flex flex-row items-end gap-2">
                  <div className="bg-grey-50 text-grey-900 min-h-8 rounded-2xl rounded-tl-sm px-3 py-2 shadow-xl">
                    <p className="typo-14-regular leading-[1.45] break-words whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                  <span className="typo-10-regular text-grey-300 mb-1 leading-none">
                    {message.time}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatMessageList;
