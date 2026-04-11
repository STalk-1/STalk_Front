import type { ReactNode } from 'react';

type ChatHeaderProps = {
  title: ReactNode;
  subtitle: string;
  statusLabel: string;
  audienceLabel: string;
  onBack: () => void;
};

export type { ChatHeaderProps };
