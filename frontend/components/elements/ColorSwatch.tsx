import styled from "styled-components"


export function ColorSwatch() {
  return (
    <StyledSwatch>
      <div className="box">1</div>
      <div className="box">2</div>
      <div className="box">3</div>
      <div className="box">4</div>
      <div className="box">5</div>
      <div className="box">6</div>
      <div className="box">7</div>
      <div className="box">8 color 3 light</div>
      <div className="box">9 color 3 dark </div>
    </StyledSwatch>
  )
}

// srgb, lab, oklch

const StyledSwatch = styled.div`

  --color-1: red;
  --color-2: blue;
  --color-3: green;
  --color-3-light: color-mix(
      in srgb, white 70%, var(--color-3)
    );
  --color-3-dark: color-mix(
      in srgb, black 50%, var(--color-3)
    );
 
  display: flex;
  width: 100%;

  .box{
    /* width: 30px; */
    flex: 1;
    height: 100px;
  }

  .box:nth-child(1){
    background: var(--color-1)
  }
  .box:nth-child(2){
    background: color-mix(
      in srgb, var(--color-1) 80%, var(--color-2)
    );
  }
  .box:nth-child(3){
    background: color-mix(
      in srgb, var(--color-1) 40%, var(--color-2)
    );
  }

  .box:nth-child(4){
    background: var(--color-2)
  }
  .box:nth-child(5){
    background: color-mix(
      in srgb, var(--color-2) 80%, var(--color-3)
    );
  }
  .box:nth-child(6){
    background: color-mix(
      in srgb, var(--color-2) 40%, var(--color-3)
    );
  }

  .box:nth-child(7){
    background: var(--color-3)
  }
  .box:nth-child(8){
    background: var(--color-3-light)
  }
  .box:nth-child(9){
    background: var(--color-3-dark)
  }
`