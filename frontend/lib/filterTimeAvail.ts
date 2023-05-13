import { Availability, Booking, User } from "./types"

type TimeOpt = {
  value: string,
  label: string,
}

type Range = {
  start:string,
  end:string,
}

// todo
// go through each day for 2 years out?
// is there a gig or avail overlap?
// if it's a full overlap - diable day

// ~~if day is partial overlap~~
// find where overlap, see if a service can fit in remaning time (IF BEFORE)
// if no times are available for that day, disable day
// if the service's duration can't fit in the open times, BUFFER TIME, disable day

// if gig start - back up time one duration before. deleting times that would overlap
// if gig end - already working ✅

/* 
  inputs
  - Service
  - defaultTimes
  - employee
  - 
*/

export function findBlackoutDates(employee:User, buisnessHours:Range, serviceDurationHours:number){
  const busyDays = findEmployeeBusyDays(employee, buisnessHours, serviceDurationHours)

  return busyDays
  
}

function findEmployeeBusyDays(employee:User, buisnessHours:Range, serviceDurationHours:number) {

  const blackoutArray:string[] = []

  employee.gigs.map((gig:Booking) => {
    
    const gigRange = {
      start: gig.start,
      end: gig.end,
    }

    const newDates = calcPartialDays(gigRange, buisnessHours, serviceDurationHours)
    blackoutArray.push(...newDates)

  })

  employee.availability.map((avail:Availability) => {
    if(avail.type === 'AVAILABLE') return console.log('date is of type AVAILABLE')
    
    const availRange = {
      start: avail.start,
      end: avail.end,
    }

    const newDates = calcPartialDays(availRange, buisnessHours, serviceDurationHours)
    blackoutArray.push(...newDates)

  })
  
  return blackoutArray
}

function calcPartialDays(range:Range, buisnessHours:Range, serviceDurationHours:number){

  const newDates:string[] = []

  const startBusy = new Date(range.start);
  const endDate   = new Date(range.end);

  const startBusyTime     = new Date(startBusy.getTime())
  const startBusyMin  = (startBusyTime.getHours() * 60) + startBusyTime.getMinutes()
  const endBusy       = new Date(endDate.getTime())
  const endBusyMin    = (endBusy.getHours() * 60) + endBusy.getMinutes()
  

  if(startBusyMin > 0){
    // TODO partial day, how do i 
    // calc if service range doesen't fit inside available times? 
    // service.buisnessHours Range
    // this busyRange
    // if there is overlap starting at buisness open? - blackout date - skip next lines
    if(isFitAnotherService(startBusy, buisnessHours, serviceDurationHours)){
      startBusy.setDate(startBusy.getDate() + 1) // do not include partial vacation day, move to next day, zero time
    } 
    // else {
    //   console.log('cannot fit another of this SERVICE before end of day, keep day blacked out', startBusy);
    // }

    startBusy.setHours(0); startBusy.setMinutes(0); startBusy.setSeconds(0); startBusy.setMilliseconds(0);
  } 

  if(endBusyMin < 1439){
    // TODO  could reverse. have buisnessHours.end, reverse time by serviceDuration, check to see if another gig can be added
    endDate.setDate(endDate.getDate() - 1) // do not include partial vacation day, move to previous day, zero time
    endDate.setHours(59); endDate.setMinutes(59); endDate.setSeconds(0); endDate.setMilliseconds(0);
  }
  
  let currentDate = startBusy;
  while (currentDate <= endDate) {
    // todo carries start time with it to the other dates
    newDates.push(new Date(currentDate).toString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return newDates
}

// fit another service on day BEFORE employee is busy
function isFitAnotherService(startBusy:Date, buisnessHours:Range, serviceDurationHours:number) {

  const busyDay = new Date(startBusy)
  const [hours, minutes, seconds] = buisnessHours.start.split(":").map(Number)
  const buisnessOpen = new Date(busyDay.getFullYear(), busyDay.getMonth(), busyDay.getDate(), hours, minutes, seconds); 
  const firstServiceEnd = buisnessOpen.setMinutes(buisnessOpen.getMinutes() + (serviceDurationHours * 60))
  const gigStart = startBusy.getTime();
  
  
  if (gigStart <= firstServiceEnd) {
    // console.warn('first service slot overlaps with busy day');
    // console.table({
    //   buisnessOpen,
    //   firstServiceEnd,
    //   gigStart,
    // })
    return false;
  }


  return true;
}

export function findBlackoutTimes(){

}

// // todo refactor this into a lib file. skip any dates that are in the past!
// function handleBlackoutDates( id:string ){

//   resetServiceSlotTimes()
  
//   const selectedEmpl = services.find((x: any) => x.id === serviceId)?.employees.find((x:any) => x.id === id)
//   if(!selectedEmpl) return setBlackoutDates([])
//   setPickedStaff(selectedEmpl)

//   const blackoutArray:string[] = []
  
//   selectedEmpl.gigs.map((gig:Booking) => {
//     // todo this could be condensed with 'availability' function
//     const startBusy = new Date(gig.start);
//     const endDate = new Date(gig.end);

//     const startBusy = new Date(startBusy.getTime())
//     const startBusyMin = (startBusy.getHours() * 60) + startBusy.getMinutes()
//     const endBusy = new Date(endDate.getTime())
//     const endBusyMin = (endBusy.getHours() * 60) + endBusy.getMinutes()
    

//     // todo what if busy day is within one day, i.e. '9am - 12pm on May 5th'?
//     if(startBusyMin > 0){
//       startBusy.setDate(startBusy.getDate() + 1) // do not include partial vacation day, move to next day, zero time
//       startBusy.setHours(0); startBusy.setMinutes(0); startBusy.setSeconds(0); startBusy.setMilliseconds(0);
//     } 

//     if(endBusyMin < 1439){
//       endDate.setDate(endDate.getDate() - 1) // do not include partial vacation day, move to previous day, zero time
//       endDate.setHours(0); endDate.setMinutes(0); endDate.setSeconds(0); endDate.setMilliseconds(0);
//     }

//     let currentDate = startBusy;
//     while (currentDate <= endDate) {
//       blackoutArray.push(new Date(currentDate).toString());
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//   })

//   selectedEmpl.availability.map((avail:Availability) => {
//     if(avail.type === 'AVAILABLE') return console.log('date is of type AVAILABLE')
    
//     const startBusy = new Date(avail.start);
//     const endDate = new Date(avail.end);

//     const startBusy = new Date(startBusy.getTime())
//     const startBusyMin = (startBusy.getHours() * 60) + startBusy.getMinutes()
//     const endBusy = new Date(endDate.getTime())
//     const endBusyMin = (endBusy.getHours() * 60) + endBusy.getMinutes()
    

//     if(startBusyMin > 0){
//       startBusy.setDate(startBusy.getDate() + 1) // do not include partial vacation day, move to next day, zero time
//       startBusy.setHours(0); startBusy.setMinutes(0); startBusy.setSeconds(0); startBusy.setMilliseconds(0);
//     } 

//     if(endBusyMin < 1439){
//       endDate.setDate(endDate.getDate() - 1) // do not include partial vacation day, move to previous day, zero time
//       endDate.setHours(0); endDate.setMinutes(0); endDate.setSeconds(0); endDate.setMilliseconds(0);
//     }

//     let currentDate = startBusy;
//     while (currentDate <= endDate) {
//       // todo carries start time with it to the other dates
//       blackoutArray.push(new Date(currentDate).toString());
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//   })
  
//   setBlackoutDates(blackoutArray)
// }

function filterOutOfBuisness(times:TimeOpt[], buisnessHours:{start:string,end:string}){

  const openDate = new Date(`2000-01-01T${buisnessHours.start}`)
  const closedDate = new Date(`2000-01-01T${buisnessHours.end}`)

  
  const filteredTimes = times.filter(time => {
    const specificTime = new Date(`2000-01-01T${time.value}`)

    if(openDate <= specificTime && specificTime <= closedDate){
      return true
    }

    return false

  })

  
  return filteredTimes

}