import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

type iProps = {
  question: string,
  answer: string,
}

export function AnswerReveal({question = 'I have a question!', answer = 'Here is your answer'}:iProps) {

  const [isShown, setisShown] = useState(false)
  const scrollContRef = useRef<HTMLParagraphElement>(null)


  function handleTextFormat(text:string){
    const array = text.split('\n')
    return array
  }

  
  return (
    <StyledAnswer scrollHeight={ scrollContRef.current ? scrollContRef.current.scrollHeight + 100 : 100}>

      <h4>Question: </h4>

      <p className="question"> 
        {handleTextFormat(question).map((line:string, i:number) => (
          <p key={i}>{line}</p>
        ))}
      </p>

      <h4>Answer: </h4>

      <button onClick={() => setisShown(!isShown)}>
        {isShown ? 'hide' : 'reveal'}
      </button>

      <div ref={scrollContRef} className={isShown ? 'expanded answer' : 'collapsed answer'}>
        {handleTextFormat(answer).map((line:string, i:number) => (
          <p key={i}>{line}</p>
        ))}
      </div>

    </StyledAnswer>
  )
}

const StyledAnswer = styled.div<{scrollHeight:number}>`

  border: solid black 1px;
  padding: 1em;
  margin: 1em 0;

  h4{
    margin-bottom: 0;
  }

  div.quetion{

  }

  div.answer{
    border: solid 1px black;
    border-radius: 5px;

    font-size: 16px;
    line-height: 38px;
    padding: 0.3em;
    overflow-y: hidden;
    transition: all 1s ease-in-out;
  }

  .collapsed{
    max-height: 0;
    background-color: #05052d;
  }

  .expanded{
    background-color: white;
    max-height: ${props => props.scrollHeight || 30}px;
  }

`