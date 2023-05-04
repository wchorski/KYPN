import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
require('dotenv').config()

const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || 'NO_KEY_SET'
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || 'NO_EMAIL_SET'
const CAL_ID = 'cutefruit88@gmail.com'

type GEvent = {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  reminders: {
    useDefault: boolean;
    overrides: [{ method: 'popup' | 'email'; minutes: number }];
  };
  attendees: [{ email: string; comment: string }];
  sendUpdates: 'all' | 'externalOnly' | 'none';
}

export const createGEvent = async (gEvent: GEvent) => {
  // create client that we can use to communicate with Google 
  const client = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: [ // set the right scope
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  });

  const calendar = google.calendar({ version: 'v3' });

  // We make a request to Google Calendar API.

  try {
    const res = await calendar.events.insert({
      calendarId: CAL_ID,
      auth: client,
      requestBody: gEvent,
    });
    return res.data.htmlLink;
  } catch (error) {
    throw new Error(`Could not create Google event: ${(error as any).message}`);
  }
}
