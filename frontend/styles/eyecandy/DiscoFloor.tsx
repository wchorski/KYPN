import styled from "styled-components"

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
    <StyledDiscoFloor>
      {squares.map((sqr,i) => (
        <div 
        className="grid-item"
        key={i}
        style={{
          backgroundColor: sqr.color,
          animationDelay: `${String(i)}s`,

        }}>

        </div>
      ))}
    </StyledDiscoFloor>
  )
}

const StyledDiscoFloor = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  .grid-item {
    aspect-ratio: 1/ 1;
    display: flex;
    align-items: center;
    padding: 5%;
    background-color: #1E1E1E;
    color: #fff;
    animation-duration: 10.3s;
    animation-name: pulse;
    animation-iteration-count: infinite;
    opacity: 0;
    
  }

  .red { background-color: #ff0000; }
  .blue { background-color: #0000ff; }
  .green { background-color: #00ff00; }
  .yellow { background-color: #ffff00; }

  @keyframes pulse {
    0%{
      opacity: 0;
      filter: blur(20px);
    }
    60%{
      opacity: 0;
      filter: blur(20px);
    }
    90%{
      opacity: 0;
      filter: blur(10px);
    }
    95%{
      opacity: .5;
      filter: blur(10px);
    }
    100%{
      opacity: 0;
      filter: blur(50px);
    }
  }
`