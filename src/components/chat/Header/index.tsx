import { IcBack, IcChat } from '@/assets/icons';

import type { ChatHeaderProps } from './types';

function ChatHeader({
  title,
  subtitle,
  statusLabel,
  audienceLabel,
  onBack,
}: ChatHeaderProps) {
  return (
    <header className="shrink-0 px-4 pt-4 pb-3 md:px-6 md:pt-5 md:pb-4">
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-label="이전으로"
          onClick={onBack}
          className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-black"
        >
          <IcBack className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="min-w-0">
          <p className="typo-16-regular text-grey-900 leading-none">{title}</p>
          <p className="text-grey-500 typo-10-regular leading-none">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <IcChat className="h-5.75 w-5.75 text-green-500" aria-hidden="true" />
        <p className="typo-16-medium text-black">{statusLabel}</p>
        <span className="typo-10-regular inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1.5 leading-none text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {audienceLabel}
        </span>
      </div>
    </header>
  );
}

export default ChatHeader;
