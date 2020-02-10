/**
 *
 * ApiKeys
 *
 */

import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import makeSelectApiKeys from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

export function ApiKeys() {
  useInjectReducer({ key: 'apiKeys', reducer });
  useInjectSaga({ key: 'apiKeys', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ApiKeys.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  apiKeys: makeSelectApiKeys(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ApiKeys);
