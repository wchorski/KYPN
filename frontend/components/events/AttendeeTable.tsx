import { dateLocaleFileName, datePrettyLocalDay } from "../../lib/dateFormatter"
import { Event } from "../../lib/types"
import { Table } from "../elements/Table"
import TableExport from "../elements/TableExport"

type Props = {
  event:Event,
  className:string,
}

export function AttendeeTable({event, className}:Props) {

  const tickets = event.tickets?.map(t => ({
    status: t.status,
    userId: t.holder.id,
    name: t.holder.name,
    nameLast: t.holder.nameLast,
    email: t.holder.email,
  }))
  
  console.log({tickets});


  return (<>
    <TableExport tableData={tickets || []} filename={dateLocaleFileName(event.start || '') + ' ' + event.summary}/>

    <div className={className}>
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
      
    </div>
  </>)
}
