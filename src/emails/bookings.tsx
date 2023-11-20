import { Booking } from '@ks/types';
import { envs } from '../../envs';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react'
import { datePrettyLocal } from '../lib/dateFormatter';

type BookingEmailProps =  {
  operation: 'create'|'update'|'delete',
  booking: Booking,
  imgUrl?:string,
}

export default function BookingEmail({
  operation,
  booking,
  imgUrl =  envs.FRONTEND_URL + `/assets/logo.png`,
}: BookingEmailProps){

  const previewText = `Booking: ${operation}`;

  return (
    <Html>
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Row>
              <Column>
                <Text style={heading}> Booking </Text>
                <Text style={subheading}> {operation} </Text>
              </Column>
              <Column>
                <Button style={button} href={envs.FRONTEND_URL + `/bookings/${booking.id}`}>
                  View Account
                </Button>
              </Column>
            </Row>
  
            <Section style={{ paddingBottom: '20px' }}>
              <Row>

                <Container style={review}>
                  <table>
                    <tbody>
                      <tr>
                        <td> Status: </td>
                        <td><span style={{...status, ...statusState[booking.status]}}> {booking.status} </span></td>
                      </tr>
                      <tr>
                        <td> Client: </td>
                        <td>{booking.name}</td>
                      </tr>
                      <tr>
                        <td> Email: </td>
                        <td>{booking.email}</td>
                      </tr>
                      <tr>
                        <td> Phone: </td>
                        <td>{booking.phone}</td>
                      </tr>
                      <tr>
                        <td> Service: </td>
                        <td>{booking?.service?.name}</td>
                      </tr>
                      <tr>
                        <td> Event Start: </td>
                        <td>{datePrettyLocal(booking.start, 'full')}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <Text>
                    Notes:
                  </Text>
                  <Text>
                    {booking.notes}
                  </Text>
                  
                </Container>
                
              </Row>

              <Container style={footer}>
                <Row>
                  <Img
                    src={imgUrl}
                    width="50"
                    height="50"
                    alt={envs.SITE_TITLE + ' logo'}
                  />
                  <Text>
                    <Link href={envs.FRONTEND_URL} style={link}>
                      {envs.SITE_TITLE}
                    </Link>
                  </Text>   
                </Row>
              </Container>

              <Hr style={hr} />
              
              <Section>
                <Row>
                  <Link href={`mailto:${envs.ADMIN_EMAIL_ADDRESS}`} style={reportLink}>
                    request help
                  </Link>
                </Row>
              </Section>

            </Section>

          </Container>
        </Section>
      </Body>
    </Html>
  );
}

const status = {
  borderLeft: 'solid 10px cyan',
  background: '#fff',
  paddingInline: '10px',
  borderRadius: '5px',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderLeftWidth: '10px',
} as React.CSSProperties

const BLUE = 'rgb(0, 132, 255)'
const YELLOW = 'rgb(224, 224, 47)'
const RED = 'rgb(148, 3, 7)'
const GREY = 'rgb(107, 130, 141)'
const GREEN = 'rgb(89, 201, 110)'

const statusState = {
  ACTIVE: {
    borderColor: BLUE,
  },
  TRIAL: {
    borderColor: BLUE,
  },
  DOWNPAYMENT: {
    borderColor: BLUE,
  },
  CONFIRMED: {
    borderColor: BLUE,
  },
  SUSPENDED: {
    borderColor: YELLOW,
  },
  PAUSED: {
    borderColor: YELLOW,
  },
  POSTPONED: {
    borderColor: YELLOW,
  },
  HOLD: {
    borderColor: YELLOW,
  },
  YELLOW: {
    borderColor: YELLOW,
  },
  EXPIRED: {
    borderColor: RED,
  },
  DELINQUENT: {
    borderColor: RED,
  },
  REJECTED: {
    borderColor: RED,
  },
  CANCELED: {
    borderColor: GREY,
  },
  LEAD: {
    borderColor: GREY,
  },
  PAST: {
    borderColor: GREY,
  },
  PAID: {
    borderColor: GREEN,
  },
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  display: 'flex',
};

const userImage = {
  margin: '0 auto',
  marginBottom: '16px',
  borderRadius: '50%',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  marginBottom: '0',
} as React.CSSProperties;

const subheading = {
  marginTop: '0',
} as React.CSSProperties

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
};

const review = {
  ...paragraph,
  padding: '24px',
  backgroundColor: '#f2f3f3',
  borderRadius: '4px',
};

const button = {
  backgroundColor: envs.COLOR_PRIMARY,
  borderRadius: '3px',
  color: envs.COLOR_TXT_PRIMARY,
  fontSize: '18px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: 'fit-content',
  padding: '15px',
  margin: '10px 0',

} as React.CSSProperties

const link = {
  ...paragraph,
  color: envs.COLOR_PRIMARY,
  display: 'block',
};

const reportLink = {
  fontSize: '14px',
  color: '#9ca299',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = { 
  background: '#323232',
  padding: '1rem',
} as React.CSSProperties
