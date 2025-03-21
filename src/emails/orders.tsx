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
import type { Order } from '../keystone/types';
import { datePrettyLocal } from '../lib/dateFormatter';
import moneyFormatter from '../lib/moneyFormatter';
import { emailStyles } from "./emailStyes";

const { main, container, heading, subheading, button, footer, hr, link, paragraph, reportLink, review, status, statusState, userImage, thumbnail } = emailStyles

type OrderEmailProps =  {
  operation: 'create'|'update'|'delete',
  order: Order,
  imgUrl?:string,
}

export default function OrdersEmail({
  operation,
  // @ts-ignore
  order = testOrder,
  imgUrl =  envs.FRONTEND_URL + `/assets/logo.png`,
}: OrderEmailProps){

  const previewText = `Order: ${operation}`;

  return (
    <Html>
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Row>
              <Column>
                <Text style={heading}> Order </Text>
                <Text style={subheading}> {operation} </Text>
              </Column>
              <Column style={{textAlign: 'right'}}>
                <Button style={button} href={envs.FRONTEND_URL + `/orders/${order?.id}`}>
                  View Account
                </Button>
              </Column>
            </Row>
  
            <Section style={{ paddingBottom: '20px' }}>
              <Row>
                <table>
                  <tbody>
                    <tr>
                      <td> Status: </td>
                      <td><span style={{...status, ...statusState[order.status]}}> {order?.status} </span></td>
                    </tr>
                    <tr>
                      <td> Client: </td>
                      <td>{order?.user?.name}</td>
                    </tr>
                    <tr>
                      <td> Email: </td>
                      <td>{order?.user?.email}</td>
                    </tr>
                    <tr>
                      <td> Order Date: </td>
                      <td>{datePrettyLocal(order?.dateCreated, 'full')}</td>
                    </tr>
                  </tbody>
                </table>

                {/* <Container style={review}> */}
                  
                  <table style={{borderCollapse: 'collapse', margin: '10px 0'} }>
                    <thead style={reciepthead}>
                      <tr>
                        <th style={{...reciepcell, textAlign: 'left'}} align='left'>Image</th>
                        <th style={{...reciepcell, textAlign: 'left'}} align='left'>Item</th>
                        <th style={reciepcell} align='right'>Quantity</th>
                        <th style={reciepcell} align='right'>Price</th>
                      </tr>
                    </thead>
                    <tbody style={recieptbody}>
                      {order?.items?.map( (item, i) => (
                        <tr style={recieptrow} key={i}>
                          <td  style={reciepcell}> 
                            <img src={item.image} alt="product image" width="100" height="100" style={thumbnail} /> 
                          </td>
                          <td align="left" style={reciepcell}>
                            {item?.name}
                          </td>
                          <td align="right" style={reciepcell}>
                            x{item?.quantity}
                          </td>
                          <td align="right" style={reciepcell}>
                            { moneyFormatter(item?.price) }
                          </td>
                        </tr>
                      ))}
                      {order?.ticketItems?.map( ticket => (
                        <tr style={recieptrow} key={ticket.id}>
                          <td  style={reciepcell}> 
                            <img src={ticket?.event?.image} alt="event image" width="100" height="100" style={thumbnail} /> 
                          </td>
                          <td align="left" style={reciepcell}>
                            {ticket?.event?.summary}
                          </td>
                          <td align="right" style={reciepcell}>
                            <Button href={envs.FRONTEND_URL + `/tickets/${ticket.id}`}>
                              {ticket?.orderIndex} 🎟 
                            </Button>
                          </td>
                          <td align="right" style={reciepcell}>
                            { moneyFormatter(ticket?.event?.price) }
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot style={reciepthead}> 
                      <tr>
                        <td></td>
                        <td></td>
                        <td style={reciepcell}>
                          Total:
                        </td>
                        <td style={reciepcell}>
                          <strong> {moneyFormatter(order?.total)}</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  
                {/* </Container> */}
                
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


const reciept = {
  margin: '20px 0',
  backgroundColor: '#ebe9e9',
  borderCollapse: 'collapse',
  textAlign: 'left',
  boxShadow: '#00000033 1px 2px 9px',
  borderRadius: 'border-radius: 10px',
  width: '100%',
} as React.CSSProperties

const reciepthead = {
  padding: '10px',
  backgroundColor: '#ebe9e9',
} as React.CSSProperties

const recieptbody = {
  backgroundColor: 'white',
} as React.CSSProperties

const recieptrow = {
  borderBottom: 'solid 1px #d7d7d7'
} as React.CSSProperties
const reciepcell = {
  padding: '10px',
} as React.CSSProperties

const testOrder = {
  id: '1234',
  dateCreated: '2023-11-23T12:00:00',
  status: 'COMPLETE TEST DEBUG',
  total: 121212,
  // @ts-ignore
  user: {
    name: 'Mario',
    email: 'Mario@mushMail.com',
  },
  // @ts-ignore
  items: [
    // @ts-ignore
    {
      image: 'https://th.bing.com/th/id/OIP.-QuuHYm9AxHIHdk9Pg2yXgAAAA?rs=1&pid=ImgDetMain',
      name: 'bluberry',
      quantity: 3,
      price: 300,
    },
    {
      image: 'https://clipartcraft.com/images/grape-clipart-smiling-2.png',
      name: 'cranberry',
      quantity: 1,
      price: 1300,
    },
    {
      image: 'https://i.pinimg.com/originals/76/43/84/76438454ab45c67db75bfc35dfa5c948.jpg',
      name: 'banun',
      quantity: 2,
      price: 440,
    },
  ],
  ticketItems: [
    {
      // @ts-ignore
      event: {
        summary: 'Bear Berry Forest',
        image: 'https://i.pinimg.com/originals/76/43/84/76438454ab45c67db75bfc35dfa5c948.jpg',
        price: 2000,
      },
      id: '111',
    },
    {
      // @ts-ignore
      event: {
        summary: 'Bear Berry Forest',
        image: 'https://i.pinimg.com/originals/76/43/84/76438454ab45c67db75bfc35dfa5c948.jpg',
        price: 2000,
      },
      id: '222',
    },
    {
      // @ts-ignore
      event: {
        summary: 'Bear Berry Forest',
        image: 'https://i.pinimg.com/originals/76/43/84/76438454ab45c67db75bfc35dfa5c948.jpg',
        price: 2000,
      },
      id: '333',
    },
  ]
}