import {quote} from '@styles/blocs/quote.module.scss';
import Link from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';

type QuoteProps = {
  href:string|undefined,
  attribution: ReactNode;
  content: ReactNode;
};

export function Quote({ href, attribution, content }: QuoteProps) {
  
  if(href) return (
    <blockquote className={quote}>
      <Link href={href} target='blank'>

        <div style={{ fontStyle: 'italic', }}>{content}</div>
        <strong >— {attribution}</strong>

      </Link>
    </blockquote>
  )
  
  return (
    <blockquote className={quote}>

      <div style={{ fontStyle: 'italic', }}>{content}</div>
      <strong >— {attribution}</strong>

    </blockquote>
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