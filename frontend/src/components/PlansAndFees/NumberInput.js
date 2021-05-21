import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const NumberInput = ({
  inputRef, onChange, name, ...other
}) => (
  <NumberFormat
    style={{
      color: '#fff',
      textAlign: 'center',
    }}
    {...other}
    getInputRef={inputRef}
    onValueChange={
      (values) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        });
      }
    }
    thousandSeparator
    isNumericString
    allowNegative={false}
    allowLeadingZeros={false}
  />
);

NumberInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumberInput;
