import styles from '@styles/error.module.scss'
import React from 'react';

import PropTypes from 'prop-types';
import { MdError } from 'react-icons/md';

const ErrorMessage = ({ error }: any) => {

  if (!error || !error.message) return null;
  // console.log('error, ', error);

  if (error.networkError && error.networkError.result && error.networkError.result.errors?.length) {
    return error.networkError.result.errors.map((error: any, i: any) => (
      <div className={styles.error_comp} key={i}>
        <p data-testid="graphql-error">
          <strong> <MdError style={{ color: 'red' }} /> </strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ));
  }
  return (
    <div className={styles.error_comp}>
      <p data-test="graphql-error">
        <strong> <MdError style={{ color: 'red' }} /> {error?.code}: </strong>

        {error?.message?.replace('GraphQL error: ', '')}
      </p>
    </div>
  );
};

ErrorMessage.defaultProps = {
  error: {},
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
