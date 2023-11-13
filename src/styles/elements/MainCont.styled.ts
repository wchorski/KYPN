import styled from 'styled-components'


export const StyledMainCont = styled.main`

  background-color: var(--c-bg);
  /* background-color: red; */

  /* .container{ */
    /* margin-right: auto;  */
    /* min-height: 90vh; */
    /* display: flex; */
    /* flex-direction: column; */

  /* } */
  /* padding: 0 1em; */
  /* max-width: var(--width-cont); */
  /* margin: 0 auto;  */
  /* padding-top: 1em; */


  
  /* .header-cont{
    background-color: #50421e;
  } */
  .markdown-title{
    font-size: 3em;
    /* background-color: #50421e; */

    padding: .1em;
    padding-top: 1em;

    margin: 0;


    position: relative;

    &::after {
      content: "";
      background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 .15 .9" preserveAspectRatio="none"><polygon style="fill: yellow;" points="1,0 .2,1 0,1 "/></svg>');
      background-size: 30px 30px;
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0px;
      right: 0;
      z-index: 2;
    }

  }
  hr.title-bottom-line{
    border: solid var(--c-1) 1px;
    margin-top: 0;
  }

  .frontmatter{
    opacity: .6;
  }


  /* height: 100vh; */
  
  /* overflow: hidden; */
  /* &:hover{
    overflow: overlay;
  } */

  .body-aside-cont{
    display: flex;
    flex-grow: 1;
  }

  .markdown-body{
    flex-grow: 1;
    min-width: 800px;
  }

  /* //* IF FOLDER */
  ul.folder-contents{
  list-style: none;
  
  
  li{
    margin-bottom: .2em;
    svg{
      font-size: 20px;
      margin-right: .3em;
    }
  }
}
  

`