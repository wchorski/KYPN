import styles from '@styles/blocs/discofloor.module.scss'

type Squares = {
  color:string,
}[]

export function DiscoFloor() {

  const squares:Squares = [
    {
      color: 'pink',
    },
    {
      color: 'purple',
    },
    {
      color: 'orange',
    },
    {
      color: 'cyan',
    },
    {
      color: 'red',
    },
    {
      color: 'limegreen',
    },
    {
      color: 'coral',
    },
    {
      color: 'limegreen',
    },
    {
      color: 'purple',
    },
    {
      color: 'red',
    },
  ]

  return (
    <div className={styles.disco} >
      {squares.map((sqr,i) => (
        <div 
        className={styles.grid_item}
        key={i}
        style={{
          backgroundColor: sqr.color,
          animationDelay: `${String(i)}s`,

        }}>

        </div>
      ))}
    </div>
  )
}
