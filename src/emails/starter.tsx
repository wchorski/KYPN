import * as React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';

type Props = {
  url:string,
}

export default function StarterEmail(props:Props) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}
