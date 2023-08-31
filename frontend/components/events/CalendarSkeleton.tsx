
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import stylesSkel from '../../styles/eyecandy/LoadingSkeleton.module.scss'
import stylesCal from '@/styles/events/calendar.module.scss'

const numOfDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const numOfWeeks = [1,2,3,4,5]

export default function CalendarSkeleton() {
  return (
    <div className={``}>

      <div className={stylesCal.header}>
        <button className="arrow left" disabled={true}>
          <MdOutlineKeyboardArrowLeft />
        </button>
        
        <p className={stylesCal.monthLabel}>  </p>

        <button className="arrow right" disabled={true}>
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>

      <table className={stylesCal.grid}>
        
        <thead>
          <tr>
            {numOfDays.map((day, i) => (
              <th key={i}>  </th>
            ))}

          </tr>
        </thead>

        <tbody>
          {numOfWeeks.map((week, i) => (
            <tr key={i}>
              {numOfDays.map((day, i) => (
                <td style={{animationDelay: String(i*0.1) + 's'}} key={i}> </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
