import type { DirectionToneTextProps } from '@/components/common/DirectionToneText/types';

function DirectionToneText({
  direction,
  changeRate,
  as: Component = 'span',
  className = '',
  children,
}: DirectionToneTextProps) {
  const toneClass =
    direction === 'UP'
      ? 'text-red'
      : direction === 'DOWN'
        ? 'text-blue'
        : direction === 'FLAT'
          ? 'text-grey-500'
          : (changeRate ?? 0) > 0
            ? 'text-red'
            : (changeRate ?? 0) < 0
              ? 'text-blue'
              : 'text-grey-500';

  return (
    <Component className={`${toneClass} ${className}`}>{children}</Component>
  );
}

export default DirectionToneText;
export type { DirectionToneTextProps };
