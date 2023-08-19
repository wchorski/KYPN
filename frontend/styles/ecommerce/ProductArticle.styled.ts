import styled from "styled-components";

export const StyledProductArticle = styled.article`
  position: relative;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  align-items: start;
  gap: 2em;

  @media screen and (width < 600px){
    grid-auto-flow: row;
  }

  aside{
    position: relative;
  }

  .content{
    padding: 0 1rem;
    padding-bottom: 5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  figure.featured_img{
    backdrop-filter: blur;
    margin: 0;
    overflow: auto;
    display: grid;
    grid-template-rows: minmax(0,1fr) auto;
    resize: both;
    /* border: 2px dashed var(--c-accent); */
    
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 50% 0;
      background: var(--cg-stripes);
    }
  }

  .description-wrap{
    padding: 1rem 1rem;
    backdrop-filter: contrast(80%) blur(3px);
    border-radius: var(--br-sharp);
  }

  button.subscribe{
    margin: 2rem 0;
  }

  .price{
    font-size: 2rem;
    font-weight: bolder;
  }

  footer{
    margin-top: auto;
    h5.categories, h5.tags{
      display: none;
    }
  }

`