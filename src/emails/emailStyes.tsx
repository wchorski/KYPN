import { envs } from "../../envs"
import { CSSProperties } from "react"

const status = {
  borderLeft: 'solid 10px cyan',
  background: '#fff',
  padding: '0 10px',
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
  REFUNDED: {
    borderColor: BLUE,
  },
  OPEN: {
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
  STARTED: {
    borderColor: BLUE,
  },
  PROCESSING: {
    borderColor: BLUE,
  },
  SHIPPED: {
    borderColor: BLUE,
  },
  SUSPENDED: {
    borderColor: YELLOW,
  },
  PAYMENT_PENDING: {
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
  HOLDING: {
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
  CANCELLED: {
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
  RETURNED: {
    borderColor: GREEN,
  },
  COMPLETE: {
    borderColor: GREEN,
  },
  FULFILLED: {
    borderColor: GREEN,
  },
  PAYMENT_RECIEVED: {
    borderColor: GREEN,
  },
  DELIVERED: {
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

} as CSSProperties

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
} as CSSProperties

const thumbnail = { 
  objectFit: 'contain'
} as CSSProperties


export  const emailStyles = {
  status,
  statusState,
  main,
  container,
  userImage,
  heading,
  subheading,
  paragraph,
  review,
  button,
  link,
  reportLink,
  hr,
  footer,
  thumbnail,
}



