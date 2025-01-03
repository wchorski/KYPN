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

  // todo how to skip this if we are not using google client?
  if (err) {
    console.log('!!! 📅 🚫 GOOGLE Cal not connected')
    // console.log(err);
    return

  } 
  // else {
  //   console.log("📅 Google Calendar connected")
  // }
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
    timeZone: string,
  },
  end: {
    dateTime: string,
    timeZone: string,
  }
}

export async function deleteCalendarEvent(eventId:string){
  if(GOOGLE_PRIVATE_KEY === 'NO_KEY_SET') return console.log('%%%%%%% GoogleAPI Calendar: NO_KEY_SET');
  let calendar = google.calendar('v3')

  console.log('## calEvent Deleted. eventId: ', eventId);
  
  
  try {
    // console.log({event});
    
    const response = await calendar.events.delete({
      auth: jwtClient,
      calendarId: GOOGLE_CAL_ID,
      eventId: eventId,
    })


    // console.log('📅 googleapi cal delete success, ');
    // console.log({response});

    return { 
      message: 'successful calendar deletion'
    }
    
  } catch (err:any) {
    console.log('Google delete Cal API Error: ' + err)

    return { 
      id: undefined,
      htmlLink: undefined, 
      kind: undefined,
      status: undefined,
      message: err.errors.map((err:any) =>  err.message).join(', ') 
    }
  }
}

export async function updateCalendarEvent(eventId:string, event:GEvent) {
  if(GOOGLE_PRIVATE_KEY === 'NO_KEY_SET') return console.log('%%%%%%% GoogleAPI Calendar: NO_KEY_SET');
  let calendar = google.calendar('v3')
  
  try {
    // console.log({event});
    
    const response = await calendar.events.patch({
      auth: jwtClient,
      calendarId: GOOGLE_CAL_ID,
      eventId: eventId,
      requestBody: event,
    })


    // console.log('📅 googleapi cal update success, ');
    // console.log({response});

    return { 
      id: response.data.id,
      htmlLink: response.data.htmlLink, 
      kind: response.data.kind,
      status: response.data.status,
      message: response.statusText, 
    }
    
  } catch (err:any) {
    console.log('Google update Cal API Error: ' + err)

    return { 
      id: undefined,
      htmlLink: undefined, 
      kind: undefined,
      status: undefined,
      message: err.errors.map((err:any) =>  err.message).join(', ') 
    }
  }
}

export async function createCalendarEvent(event:GEvent){

  // console.log({event})
  if(GOOGLE_PRIVATE_KEY === 'NO_KEY_SET') return console.log('%%%%%%% GoogleAPI Calendar: NO_KEY_SET');
  let calendar = google.calendar('v3')
  
  try {
    // console.log({event});
    
    const response = await calendar.events.insert({
      auth: jwtClient,
      calendarId: GOOGLE_CAL_ID,
      requestBody: event,
    })
    // console.log({response});
    


    // console.log('📅 googleapi cal create success, ');
    

    return { 
      id: response.data.id,
      htmlLink: response.data.htmlLink, 
      kind: response.data.kind,
      status: response.data.status,
      message: response.statusText, 
    }
    
  } catch (err:any) {
    console.log('Google Cal API Error: ')
    console.log({err});
    
    return { 
      id: undefined,
      htmlLink: undefined, 
      kind: undefined,
      status: undefined,
      message: err.errors?.map((err:any) =>  err.message).join(', ') 
    }
  }
}