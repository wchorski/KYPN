import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html as EmailHtml,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

import { envs } from '../../envs';

interface TwitchResetPasswordEmailProps {
  user: {
    email:string,
    name?:string,
    id:string,
  }
  updatedDate?: Date;
}

const baseUrl = envs.FRONTEND_URL

export default function PasswordRestConfirmEmail({
  user = {email: 'z@m.lan', name: 'Zenon', id: '123'},
  updatedDate = new Date('June 23, 2022 4:06:00 pm UTC'),
}: TwitchResetPasswordEmailProps){
  const formattedDate = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(updatedDate);

  return (
    <EmailHtml>
      <Head />
      <Preview> Successful password change for {envs.SITE_TITLE} account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={114} src={`${baseUrl}/assets/logo.png`} />
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hi {user.name},</Text>
            <Text style={paragraph}>
              Your password was successfully changedon {' '}
              {formattedDate}. If you did not reset your password, 
              consider changing your password to a more secure option as soon as possible by 
            </Text>
            <Text style={paragraph}>

              <Button 
                href={envs.FRONTEND_URL + `/account`} 
                style={button}
              >
                Logging into your Account
              </Button>

            </Text>
            <Text style={paragraph}>
              Remember to use a password that is both strong and unique to your
              account.
            </Text>
            <Text style={paragraph}>
              Still have questions? Please contact our support email {' '}
              <Link href={`mailto:${envs.ADMIN_EMAIL_ADDRESS}?subject=Help Reset Password`} style={link}>
                {envs.ADMIN_EMAIL_ADDRESS}
              </Link>
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              {envs.SITE_TITLE}
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          {/* <Row> */}
            {/* <Column align="right" style={{ width: '50%', paddingRight: '8px' }}>
              <Img src={`${baseUrl}/static/twitch-icon-twitter.png`} />
            </Column>
            <Column align="left" style={{ width: '50%', paddingLeft: '8px' }}>
              <Img src={`${baseUrl}/static/twitch-icon-facebook.png`} />
            </Column> */}
          {/* </Row> */}
          <Text style={{ textAlign: 'center', color: '#706a7b' }}>
            <Button href={envs.FRONTEND_URL}> {envs.SITE_TITLE}</Button> <br />
            {/* 350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA */}
          </Text>
        </Section>
      </Body>
    </EmailHtml>
  );
};

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: '#efeef1',
  fontFamily,
};

const button = {
  padding: '20px',
  backgroundColor: envs.COLOR_PRIMARY,
  color: envs.COLOR_TXT_PRIMARY,
} as React.CSSProperties

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  width: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
};

const footer = {
  width: '580px',
  margin: '0 auto',
};

const content = {
  padding: '5px 50px 10px 60px',
};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
};

const sectionsBorders = {
  width: '100%',
  display: 'flex',
};

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px',
};

const sectionCenter = {
  borderBottom: `1px solid ${envs.COLOR_PRIMARY}`,
  width: '102px',
};

const link = {
  textDecoration: 'underline',
};
