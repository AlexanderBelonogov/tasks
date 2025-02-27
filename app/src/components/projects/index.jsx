import React, { useMemo } from 'react';
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, Divider, Container } from '@mui/material';

import { useGetProjectsQuery } from '../../services/projects';

const Projects = () => {
  const { data } = useGetProjectsQuery();

  const projects = useMemo(() => data?.projects?.collection || [], [data])

  return (
    <Container>
      <h1>Projects</h1>
      <List>
        {projects.map(({ id, name}) => (
          <div key={id}>
            <ListItem button>
              <Link to={`/projects/${id}/tasks`}>
                <ListItemText primary={name} />
              </Link>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default Projects;

