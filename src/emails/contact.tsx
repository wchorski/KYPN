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
import { datePrettyLocal } from '../lib/dateFormatter';
import { emailStyles } from "./emailStyes";

const { main, container, heading,  button, footer, hr, link, reportLink, review, } = emailStyles

type ContactEmailProps =  {
  contact: {
    name?:string,
    customerId?:string,
    phone?:string,
    start?:string,
    notes?:string,
    email:string,
  },
  imgUrl?:string,
}

export default function ContactEmail({
  contact,
  imgUrl =  envs.FRONTEND_URL + `/assets/logo.png`,
}: ContactEmailProps){
  
  const previewText = `New Contact: ${contact.name || 'Anonymous'}`;

  return (
    <Html>
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Row>
              <Column>
                <Text style={heading}> New Contact </Text>
                {/* <Text style={subheading}> {operation} </Text> */}
              </Column>
              <Column align='right'>
                {contact.customerId 
                ? 
                  <Button style={button} href={envs.CMS_URL + `/users/${contact.customerId}`}>
                    View User
                  </Button>
                : <Text> Non Registered User </Text>
                }
              </Column>
            </Row>
  
            <Section style={{ paddingBottom: '20px' }}>
              <Row>

                <Container style={review}>
                  <table>
                    <tbody>
                      <tr>
                        <td> Name: </td>
                        <td>{contact.name}</td>
                      </tr>
                      <tr>
                        <td> Email: </td>
                        <td>{contact.email}</td>
                      </tr>
                      <tr>
                        <td> Phone: </td>
                        <td>{contact?.phone}</td>
                      </tr>
                      <tr>
                        <td> Event Start: </td>
                        <td>{contact.start ? datePrettyLocal(contact.start, 'full') : 'No start date or time selected'}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <Text>
                    Notes:
                  </Text>
                  <Text>
                    {contact?.notes}
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
                  <Link href={`mailto:${envs.ADMIN_EMAIL_ADDRESS}?subject=Help Request`} style={reportLink}>
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