import React from 'react';
import PropTypes from 'prop-types';

import UseForm, { propTypes as formPropTypes, defaultProps as formDefaultProps } from './useForm';

const FormStateManager = props => {
  const { stateSchema, validationSchema, callback } = props;

  return UseForm({ stateSchema: stateSchema, validationSchema: validationSchema, callback: callback });
};

FormStateManager.propTypes = formPropTypes
FormStateManager.defaultProps = formDefaultProps

export default FormStateManager;
