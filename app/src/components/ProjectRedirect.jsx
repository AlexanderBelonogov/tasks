import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { useGetProjectsQuery } from '../services/projects';

const ProjectRedirect = () => {
  const { data } = useGetProjectsQuery();

  const navigate = useNavigate();

  useEffect(() => {
    const projects = data?.projects?.collection || []

    console.log("HEREEEEEEEEEEEE")
    if (projects.length) {
      navigate(`/projects/${projects[0].id}/tasks`, { replace: true })
    }
  }, [navigate, data])
}

export default ProjectRedirect
