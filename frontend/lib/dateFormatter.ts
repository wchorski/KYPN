import { format } from 'date-fns'

export function datePretty(date:string){

  const unixDate = Date.parse(date)
  console.log()

  const prettyDate = format(unixDate, 'MMM Lo, yyyy')

  return prettyDate
}