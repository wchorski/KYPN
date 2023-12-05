// cred - Jose Flores - https://codepen.io/joseflores8082/details/bNqGgx
import styles from '@styles/blocs/rotatingwords.module.scss'

type Props = {
  words:{
    label:string,
    color:string,
  }[],
}

const defaultWords = [
  {
    label: 'awesome',
    color: 'red',
  },
  {
    label: 'cool',
    color: 'cyan',
  },
  {
    label: 'fire',
    color: 'orange',
  },
]

export function RotatingWords({words = defaultWords}:Props) {
  return (
    <div className={styles.rotating}> 
      <div className={styles.words_wrap}>
        {words.map((w, i) => (
          <span
            key={i} 
            style={{
              color: w.color,
              animationDuration: `${(words.length * 3)}s`,
              animationDelay: `${i * 3}s`,
            }}
          > 
            {w.label} 
          </span>
        ))}


      </div>
    </div>
  )
}