import React from 'react';
import styled from 'styled-components';

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
    <StyledHero className='hero'>
      <div className='backgroundImage' style={{ backgroundImage: `url(${imageSrc})` }} />
      {caption.discriminant ? <div style={{ textAlign: 'center' }}>{caption.value}</div> : null}
    </StyledHero>
  );
}

const StyledHero = styled.div`

  &.hero {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .backgroundImage {
      background-color: white;
      background-position: center;
      background-size: cover;
      min-height: 400px;
      width: 100%;
  }

`