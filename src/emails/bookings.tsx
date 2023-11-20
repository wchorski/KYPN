import { Booking } from '@ks/types';
import { envs } from '../../envs';
import {
  Body,
  Button,
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
import { CSSProperties } from 'react'
import { datePrettyLocal } from '../lib/dateFormatter';

type BookingEmailProps =  {
  operation?: 'create'|'update'|'delete',
  booking?: Booking,
  imgUrl?:string,
}

export function BookingEmail({
  operation = 'create',
  booking = {
    name: 'yandle',
    email: 'yan@m.lan',
    phone: '123 123 1234',
    // @ts-ignore
    service: {
      name: 'big serv',
    },
    status: "HOLD",
    start: '2023-11-23T09:00',

  },
  imgUrl =  envs.FRONTEND_URL + `/assets/logo.png`,
}: BookingEmailProps){
  const previewText = `Booking: ${operation}`;

  return (
    <Html>
      <Head />
      <Preview> preview: {previewText}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Section>
              <Img
                src={envs.FRONTEND_URL + '/assets/logo.png'}
                width="96"
                height="30"
                alt={envs.SITE_TITLE + ' logo'}
              />
            </Section>
            <Section>
              <Img
                src={imgUrl}
                width="96"
                height="96"
                alt={envs.SITE_TITLE + ' logo'}
                style={userImage}
              />
            </Section>
            <Section style={{ paddingBottom: '20px' }}>
              <Row>
                <Text style={heading}> Booking </Text>
                <Text style={subheading}> {operation} </Text>

                <Button style={button} href={envs.FRONTEND_URL + `/bookings/${booking.id}`}>
                  View Account
                </Button>

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
                  
                </Container>
                
              </Row>

              <Container style={footer}>
                <Text>
                  <Link href={envs.FRONTEND_URL} style={link}>
                    {envs.SITE_TITLE}
                  </Link>
                </Text>
              </Container>

            </Section>

            <Hr style={hr} />

            <Section>
              <Row>
                <Link href={`mail:${envs.ADMIN_EMAIL_ADDRESS}`} style={reportLink}>
                  report a problem
                </Link>
              </Row>
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
} as CSSProperties

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
} as CSSProperties;

const subheading = {
  marginTop: '0',
} as CSSProperties

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
  backgroundColor: '#ff5a5f',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '18px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: 'fit-content',
  padding: '15px',
  margin: '10px 0',

} as CSSProperties

const link = {
  ...paragraph,
  color: '#ff5a5f',
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
} as CSSProperties
