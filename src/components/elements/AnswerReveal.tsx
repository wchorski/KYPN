import { useRef, useState } from "react"
import styles from '@styles/blocs/answerreveal.module.scss'

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
    <div className={styles.answer_reveal} >

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

      <div ref={scrollContRef} className={[styles.answer, isShown ? styles.expanded : styles.collapsed ].join(' ')}>
        {handleTextFormat(answer).map((line:string, i:number) => (
          <p key={i}>{line}</p>
        ))}
      </div>

    </div>
  )
}