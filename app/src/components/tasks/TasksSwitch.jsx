import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const TaskViewSwitch = ({ onToggle, toggled }) => {
  return (
    <FormControlLabel
      sx={{ float: 'right' }}
      control={<Switch onChange={onToggle} checked={toggled} />}
      label="Horizontal View"
    />
  );
};

export default TaskViewSwitch;