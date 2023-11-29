import React, { ReactNode } from 'react';

import PropTypes from 'prop-types';
import { MdError } from 'react-icons/md';
import { Section } from './layouts/Section';
import styles from '@styles/error.module.scss'

type Props = {
  error:any,
  children?:ReactNode
}

const ErrorMessage = ({ error, children }: Props) => {

  return(
    <Section layout={'1'}>
      <ErrorContents error={error} children={children} />
    </Section>
  )

}

const ErrorContents = ({ error, children }: any) => {

  if (!error || !error.message) return null;
  // console.log('error, ', error);

  if (error.networkError && error.networkError.result && error.networkError.result.errors?.length) {
    return error.networkError.result.errors.map((error: any, i: any) => (
      <div className={styles.error_comp} key={i}>
        <strong> <MdError style={{ color: 'red' }} /> </strong>
        <p data-testid="graphql-error">
          {error.message.replace('GraphQL error: ', '')}
        </p>
        {children}
      </div>
    ));
  }
  return (
    <div className={styles.error_comp}>
      <strong> <MdError style={{ color: 'red' }} /> {error?.code} </strong>
      <p data-test="graphql-error">

        {error?.message?.replace('GraphQL error: ', '')}
      </p>

      {children}
    </div>
  );
};


ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
