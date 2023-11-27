import { SubscriptionItem } from '../keystone/types';
import { envs } from '../../envs';
import { emailStyles } from "./emailStyes";
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
import moneyFormatter from '../lib/moneyFormatter';

const { main, container, heading, subheading, button, footer, hr, link, paragraph, reportLink, review, status, statusState, userImage } = emailStyles

type BookingEmailProps =  {
  operation: 'create'|'update'|'delete',
  subscriptionItem: SubscriptionItem,
  imgUrl?:string,
}

export default function SubscriptionItemEmail({
  operation,
  subscriptionItem: subItem = testSubItem,
  imgUrl =  envs.FRONTEND_URL + `/assets/logo.png`,
}: BookingEmailProps){

  const previewText = `Subscription: ${operation}`;

  return (
    <Html>
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Row>
              <Column>
                <Text style={heading}> Subscription </Text>
                <Text style={subheading}> {operation} </Text>
              </Column>
              <Column align='right'>
                <Button style={button} href={envs.FRONTEND_URL + `/subscriptions/${subItem?.id}`}>
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
                        <td><span style={{...status, ...statusState[subItem?.status]}}> {subItem?.status} </span></td>
                      </tr>
                      <tr>
                        <td> Client: </td>
                        <td>{subItem?.user?.name || subItem?.user?.email}</td>
                      </tr>
                      <tr>
                        <td> Plan: </td>
                        <td>{subItem?.subscriptionPlan?.name}</td>
                      </tr>
                      <tr>
                        <td> Price: </td>
                        <td> {moneyFormatter(subItem.custom_price)} <small>{subItem.billing_interval}</small> </td>
                      </tr>
                      <tr>
                        <td> Start: </td>
                        <td>{datePrettyLocal(subItem?.dateCreated, 'full')}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <Text>
                    Notes:
                  </Text>
                  <Text>
                    {subItem?.notes}
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

// @ts-ignore
const testSubItem = {
  status: 'ACTIVE',
  billing_interval: 'month',
  dateCreated: '2023-11-23T14:00:00',
  custom_price: 30023,
  user: {
    name: 'Victor',
    email: 'vic@m.lan',
  },
  subscriptionPlan: {
    name: 'Coolness Subscription'
  },
} as SubscriptionItem