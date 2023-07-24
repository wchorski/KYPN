import styled from 'styled-components';
import React from 'react';

import PropTypes from 'prop-types';
import { MdError } from 'react-icons/md';

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

const ErrorMessage = ({ error }: any) => {

  if (!error || !error.message) return null;
  // console.log('error, ', error);

  if (error.networkError && error.networkError.result && error.networkError.result.errors?.length) {
    return error.networkError.result.errors.map((error: any, i: any) => (
      <ErrorStyles key={i}>
        <p data-testid="graphql-error">
          <strong> <MdError style={{ color: 'red' }} /> </strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong> <MdError style={{ color: 'red' }} />  </strong>
        {error.code}
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

ErrorMessage.defaultProps = {
  error: {},
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
