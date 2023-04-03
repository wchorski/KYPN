import styled from "styled-components"
import {CSSTransition, TransitionGroup,} from 'react-transition-group';
import { useRef } from "react";
import { MdShoppingBag } from "react-icons/md";

export default function CartCount({count}:{count:number}) {

  const nodeRef = useRef(null);

  return (
    <StyledAnimation>
      <TransitionGroup>
        <CSSTransition
          nodeRef={nodeRef}
          className={'count'}
          classNames={'count'}
          key={count}
          timeout={{enter: 400, exit: 400}}
        >
          <StyledDot ref={nodeRef}>
            {count}
            <MdShoppingBag />
          </StyledDot>
        </CSSTransition>
      </TransitionGroup>
    </StyledAnimation>
  )
}

const StyledDot = styled.div`
  background-color: var(--c-1);
  color: var(--c-txt-rev);
  padding: 0.5rem;
  border-radius: 50px;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;

`
// TODO this animation is wack
const StyledAnimation = styled.span`
  position: relative;

  .count{
    display: block;
    position: relative;
    transition:  0.4s;
    backface-visibility: hidden;
    transition: 0.4s;
    /* position: absolute; */
    top: 0;
    left: 0;
  }

  .count-enter{
    /* background-color: green; */
    opacity: 0;
    transform: scale(1.3) rotateX(45deg);
  }

  .count-enter-active {
    /* background-color: red; */
    opacity: 1;
    /* transition: 2s; */
    /* transform: rotateX(0); */
  }

  .count-exit{
    /* background-color: blue; */
    opacity: 0;
    top: 0;
    position: absolute;
    /* transform: rotateX(0); */
  }

  .count-exit-active{
    /* background-color: pink; */
    opacity: 1;
    /* transition: 2s; */
    transform: scale(1) rotateX(0);
  }
`