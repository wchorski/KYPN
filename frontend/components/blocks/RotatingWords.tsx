import styled from "styled-components"

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
    <StyledRotatingWords>
      <div className="words-cont">
        {words.map((w, i) => (
          <span 
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
    </StyledRotatingWords>
  )
}

const StyledRotatingWords = styled.div`
  position:relative;
  margin:0 auto;
  width:100%;
  height: 60px;
  /* top: 100px; */
  
  .words-cont{
    display: inline;
    text-indent: 10px;


    span{
      position: absolute;
      right:0;
      left:0;
      top: 0;
      color: white;
      font-weight: bolder;
      /* opacity: 0; */
      /* overflow: hidden; */
      /* border: solid yellow 2px; */
      /* background-color: purple; */
      animation: rotate 15s cubic-bezier(0.39, -0.46, 0.38, 1.73) infinite 0s;
    }
  }

  @keyframes rotate {
    0% {
      opacity: 0; 
      transform: translateY(-100%); 
    }
    3% { 
      opacity: 1; 
      transform: translateY(0px);
    }
    17% { 
      opacity: 1; 
      transform: translateY(0px); 
    }
    20% {
      opacity: 0; 
      transform: translateY(100%); 
    }

    100% { 
      opacity: 0; 
    }
  }
`