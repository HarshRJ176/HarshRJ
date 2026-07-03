import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface PanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}

export function Panel({ children, className = '', as = 'div', ...rest }: PanelProps) {
  const Tag: ElementType = as;
  return (
    <Tag className={`panel ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
