import React, { ReactNode } from 'react';
import styles from './styles/Quote.module.css';

type QuoteProps = {
  attribution: ReactNode;
  content: ReactNode;
};

export function Quote({ attribution, content }: QuoteProps) {
  return (
    <div className={styles.quote}>
      <div style={{ fontStyle: 'italic', color: '#4A5568' }}>{content}</div>
      <div style={{ fontWeight: 'bold', color: '#47546b' }}>— {attribution}</div>
    </div>
  );
}

// const StyledQuote = styled.div`
//   &.quote {
//     padding-left: 16px;
//     background-color: #f3f5f6;
//     padding: 4px 12px 16px 48px;
//     position: relative;
//     border-radius: 6px;
//   }

//   &.quote::after {
//       content: '\201C';
//       position: absolute;
//       top: 0;
//       left: 16px;
//       font-size: 4rem;
//   }
// `