// note - tried to use styled components but something was overriding 
import React, { ReactNode } from 'react';
import styles from './styles/Callout.module.scss';

type CalloutProps = {
  intent: 'info' | 'warning' | 'error' | 'success';
  content: ReactNode;
};

export function Callout({ intent, content }: CalloutProps) {

  return (
    <blockquote
      className={styles.callout + ' ' + styles[intent]}
      // style={{
      //   background: backgroundColor,
      //   borderColor,
      // }}
    >
      <i className={`icon ${styles.icon} `}  />
      <div style={{ flex: 1 }}>{content}</div>
    </blockquote>
  );
}
