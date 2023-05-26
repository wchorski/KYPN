import { datePrettyLocalDay } from "../../lib/dateFormatter"
import { Event } from "../../lib/types"
import { Table } from "../elements/Table"
import TableExport from "../elements/TableExport"

type Props = {
  event:Event,
}

export function AttendeeTable({event}:Props) {

  const tickets = event.tickets?.map(t => ({
    status: t.status,
    userId: t.holder.id,
    name: t.holder.name,
    nameLast: t.holder.nameLast,
    email: t.holder.email,
  }))
  
  console.log({tickets});


  return (<>
    <TableExport tableData={tickets || []}/>

    <Table 
      caption={event.summary + ' ' + datePrettyLocalDay(event.start || '') || ''}
      route='/users'
      headers={[
        'status',
        'userId',
        'name',
        'nameLast',
        'email',
      ]}
      cells={tickets || []}
    />
    
  </>)
}
