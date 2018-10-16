import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const CheckboxField = props => {
  const { meta: { error, touched }, input, ...custom } = props;
  console.log('input', input);

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...custom}
          checked={!!input.value}
          onChange={input.onChange} />
      }
      label={custom.label} />
  );
};

export default CheckboxField;
