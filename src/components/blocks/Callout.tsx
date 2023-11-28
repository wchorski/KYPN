// note - tried to use styled components but something was overriding 
import React, { ReactNode } from 'react';
import styles from '@styles/blocs/Callout.module.scss'

type CalloutProps = {
  intent: 'info' | 'warning' | 'error' | 'success';
  content?: ReactNode;
  children: ReactNode;
};

export function Callout({ intent, content, children }: CalloutProps) {

  return (
    <blockquote
      className={styles.callout + ' ' + styles[intent]}
      // style={{
      //   background: backgroundColor,
      //   borderColor,
      // }}
    >

      <i className={`icon ${styles.icon} `}  />

      <div style={{ flex: 1 }}>
        {content}
        {children}
      </div>

    </blockquote>
  );
}
