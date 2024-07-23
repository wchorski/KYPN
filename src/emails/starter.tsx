import * as React from 'react';
import { Html } from '@react-email/components';
import { Text, Button } from '@react-email/components';

type Props = {
  url:string,
}

export default function StarterEmail(props:Props) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
      <Text> hey there starter </Text>
    </Html>
  );
}
