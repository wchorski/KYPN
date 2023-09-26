import React from 'react';
import styles from './styles/hero.module.scss'

type HeroProps = {
  imageSrc: string;
  caption:
  | {
    discriminant: false;
  }
  | {
    discriminant: true;
    value: React.ReactNode;
  };
};

export function Hero({ imageSrc, caption }: HeroProps) {
  return (
    <div className={styles.hero}>
      <div className='backgroundImage' style={{ backgroundImage: `url(${imageSrc})` }} />
      {caption.discriminant ? <div style={{ textAlign: 'center' }}>{caption.value}</div> : null}
    </div>
  );
}

