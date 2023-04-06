import { format } from 'date-fns'

export function datePretty(date:string){

  console.log(date);
  if(!date) return 'NO DATE'
  

  const unixDate = Date.parse(date)
  console.log()

  const prettyDate = format(unixDate, 'MMM Lo, yyyy')

  return prettyDate
}