import styles from '@styles/eyecandy/loading.module.scss'


export function LoadingAnim() {
  return (
    <span className={styles.loading} >
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
