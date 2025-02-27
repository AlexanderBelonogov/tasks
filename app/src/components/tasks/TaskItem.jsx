import React from 'react';
import { Grid2, Box, Typography } from '@mui/material';

const TaskItem = ({ isHorizontal, task }) => {
  return (
    <Grid2 item xs={12} md={isHorizontal ? 3 : 12}>
      <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 1 }}>
        <Typography>{task}</Typography>
      </Box>
    </Grid2>
  );
};

export default TaskItem;