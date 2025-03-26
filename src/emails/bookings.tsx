// @ts-nocheck
import {
  Body,
  Button,
  Column,
  Container,
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

import { envs } from '../../envs';
import type { Booking } from '../keystone/types';
import { datePrettyLocal } from '../lib/dateFormatter';
import { emailStyles } from "./emailStyes";

const { main, container, heading, subheading, button, footer, hr, link, reportLink, review, status, statusState } = emailStyles

type BookingEmailProps =  {
  operation: 'create'|'update'|'delete',
  booking: Booking,
  employeeNames:string[],
  imgUrl?:string,
}

export default function BookingEmail({
  operation,
  booking,
  employeeNames,
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
              <Column align='right'>
                <Button style={button} href={envs.FRONTEND_URL + `/bookings/${booking?.id}`}>
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
                        <td><span style={{...status, ...statusState[booking?.status]}}> {booking?.status} </span></td>
                      </tr>
                      <tr>
                        <td> Client: </td>
                        <td>{booking?.name}</td>
                      </tr>
                      <tr>
                        <td> Email: </td>
                        <td>{booking?.email}</td>
                      </tr>
                      <tr>
                        <td> Phone: </td>
                        <td>{booking?.phone}</td>
                      </tr>
                      <tr>
                        <td> Service: </td>
                        <td>{booking?.service?.name}</td>
                      </tr>
                      <tr>
                        <td> Event Start: </td>
                        <td>{datePrettyLocal(booking?.start, 'full')}</td>
                      </tr>
                      <tr>
                        <td> Staff: </td>
                        <td>
                          {employeeNames ? (
                            <ul style={{padding: '0'}}>
                              {employeeNames.map((name,i) => <li key={i}> {name}</li> )}
                            </ul>
                          ) : '-- awaiting response --'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <Text>
                    Notes:
                  </Text>
                  <Text>
                    {booking?.notes}
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