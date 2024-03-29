import React, { ReactNode } from 'react';
import styles from '@styles/blocs/quote.module.scss';
import Link from 'next/link';

type QuoteProps = {
  href:string|undefined,
  attribution: ReactNode;
  content: ReactNode;
};

export function Quote({ href, attribution, content }: QuoteProps) {
  
  if(href) return (
    <Link href={href} className={styles.quote} target='blank'>

      <div style={{ fontStyle: 'italic', }}>{content}</div>
      <strong >— {attribution}</strong>

    </Link>
  )
  
  return (
    <div className={styles.quote}>

      <div style={{ fontStyle: 'italic', }}>{content}</div>
      <strong >— {attribution}</strong>

    </div>
  )

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