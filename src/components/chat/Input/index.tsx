import { IcSend } from '@/assets/icons';

import type { ChatInputProps } from './types';

function ChatInput({ value, onChange, onSubmit, placeholder }: ChatInputProps) {
  return (
    <div className="bg-grey-50 mt-auto shrink-0 px-4 pt-3 pb-4 md:px-6 md:pt-4 md:pb-5">
      <form
        className="flex w-full items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="typo-12-medium text-grey-800 placeholder:text-grey-300 min-w-0 flex-1 bg-transparent outline-none"
          placeholder={placeholder}
        />
        <button
          type="submit"
          aria-label="메시지 전송"
          disabled={!value.trim()}
          className="disabled:bg-grey-200 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500 transition"
        >
          <IcSend className="h-4.5 w-4.5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
