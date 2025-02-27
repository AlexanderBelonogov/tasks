import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Typography, Grid2, Box } from '@mui/material';

import TaskViewSwitch from './TasksSwitch'
import TaskItem from './TaskItem'

import { useGetProjectTasksQuery, useSubscribeToTaskCreatedQuery, useGetProjectsQuery } from '../../services/projects';
import { useHorizontalMode } from '../../hooks/useActiveView';

const Tasks = () => {
  const { id } = useParams()
  const { data: projectTasks } = useGetProjectTasksQuery({ id })
  const { data: projects } = useGetProjectsQuery()
  useSubscribeToTaskCreatedQuery({ id })
  const [isHorizontal, handleToggleView] = useHorizontalMode()

  const tasks = projectTasks?.tasks?.collection || [];
  const metadata = projectTasks?.tasks?.metadata || {};

  const project = useMemo(() => projects?.projects?.collection.find(({ id: projectId }) => projectId === id), [id, projects])

  if (!tasks) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Grid2 sx={{ paddingBottom: 5 }}>
        <TaskViewSwitch onToggle={handleToggleView} toggled={isHorizontal} />
      </Grid2>
      <h3>Tasks for {project?.name}</h3>
      <Grid2 container spacing={2} direction={isHorizontal ? 'row' : 'column'}>
        {tasks.map(({ id, name }) => (
          <TaskItem key={id} task={name} isHorizontal={isHorizontal} />
        ))}
      </Grid2>
      <Grid2 container sx={{ flexDirection: 'end', marginTop: 5 }}>
        <Box sx={{ marginRight: 5 }}>Total Pages: {metadata?.totalPages}</Box>
        <Box>Total Count: {metadata?.totalCount}</Box>
      </Grid2>
    </Container>
  )
}

export default Tasks