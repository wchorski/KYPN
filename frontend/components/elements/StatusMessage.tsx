import styled from 'styled-components';
import React, { ReactNode } from 'react';

import PropTypes from 'prop-types';
import { MdError, MdCheck } from 'react-icons/md';

type Props = {
  status:'success'|'failure'|'error'|'loading'|undefined,
  message?:string|undefined,
  code?:string|number,
  children:ReactNode,
}

const StatusMessage = ({ status = undefined, message, code, children}: Props) => {

  if (!status) return null;

  if(status === 'success') return (
    <SuccessStyles>
      <p data-test="graphql-success">
        <strong> <MdCheck />  </strong>
        {code}
        {message?.replace('GraphQL error: ', '')}
        <br />
        {children}
      </p>
    </SuccessStyles>
  )

  return null;

  // return (
  //   <ErrorStyles>
  //     <p data-test="graphql-error">
  //       <strong> <MdError style={{ color: 'red' }} />  </strong>
  //       {code}
  //       {message.replace('GraphQL error: ', '')}
  //     </p>
  //   </ErrorStyles>
  // );
};

StatusMessage.defaultProps = {
  status: {},
};

StatusMessage.propTypes = {
  status: PropTypes.object,
};

export default StatusMessage;

const SuccessStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid #20df50;

  svg{
    color: #50ca6f;
  }

  p {
    color: black;
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  color: #931a33;

  p {
    color: black;
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

