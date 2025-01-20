import { loading } from '@styles/eyecandy/loading.module.css'

export function LoadingAnim ({isVisable = false}:{isVisable?:boolean}) {

  const dots = ['1', '2', '3']
  const duration = 1
  const delay = 0.3

  return (
    <span className={loading} style={{visibility: isVisable ? 'visible' : 'hidden'}} aria-label={'loading animation pending'}>
      <span>
        {dots.map((dot, i) => (
          <span
            key={i}
            style={{
              animationDuration: duration + 's',
              animationDelay: i * delay + 's'
            }}
          >
            
          </span>
        ))}
      </span>
    </span>
  )
}

export function LoadingAnimTAWTAW() {
  return (
    <span className={loading} >
      <svg width="60" height="30" viewBox="-20 -20 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="tawtaw-logo">
          <rect className="rotating-rect" id="left"   x="0"       y="0" width="80" height="80" rx="10" />
          <rect className="rotating-rect" id="right"  x="120"     y="0" width="80" height="80" rx="10"  />
          <rect className="rotating-rect" id="middle" x="60"      y="0" width="80" height="80" rx="10" stroke="black" strokeWidth="4"/>
        </g>
      </svg>
    </span>
  )
}
