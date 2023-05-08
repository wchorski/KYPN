import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const scopes = ['https://www.googleapis.com/auth/calendar'];
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || 'NO_KEY_SET'
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || 'NO_EMAIL_SET'
const GOOGLE_CAL_ID = process.env.GOOGLE_CAL_ID || 'NO_CAL_ID'


let jwtClient = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes,
})

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return
  } else {
    console.log("Successfully connected to googleapi via JWT!")
  }
})

type Data = {
  id: string|undefined|null,
  htmlLink: string|undefined|null,
  kind: string|undefined|null,
  status: string|undefined|null,
  message: any,
}

type GEvent = {
  
  summary: string,
  description: string,
  start: {
    dateTime: string,
    // timeZone: string,
  },
  end: {
    dateTime: string,
    // timeZone: string,
  }
}

export async function createCalendarEvent(event:GEvent){

  console.log({event})
    
  let calendar = google.calendar('v3')
  
  try {
    const response = await calendar.events.insert({
      auth: jwtClient,
      calendarId: GOOGLE_CAL_ID,
      requestBody: event,
    })

    console.log('googleapi cal success, ');
    

    return { 
      id: response.data.id,
      htmlLink: response.data.htmlLink, 
      kind: response.data.kind,
      status: response.data.status,
      message: response.statusText, 
    }
    
  } catch (err:any) {
    console.log('Google Cal API Error: ' + err)

    return { 
      id: undefined,
      htmlLink: undefined, 
      kind: undefined,
      status: undefined,
      message: err.errors.map((err:any) =>  err.message).join(', ') 
    }
  }
}