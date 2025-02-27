import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Grid2 } from '@mui/material';
import { BrowserRouter as Router } from "react-router-dom";

const Projects = lazy(() => import("./components/projects"));
const Tasks = lazy(() => import("./components/tasks"));
const ProjectRedirect = lazy(() => import("./components/ProjectRedirect"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Grid2 container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'row', height: '100vh', margin: '0 auto' }} spacing={2}>
          <Grid2 size={4}>
            <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
              <Projects />
            </Box>
          </Grid2>
          <Grid2 size={8}>
            <Routes>
              <Route path="/projects/:id/tasks" element={<Tasks />} />
              <Route path="*" element={<ProjectRedirect />} />
            </Routes>
          </Grid2>
        </Grid2>
      </Router>
    </Suspense>
  );
};

export default App;
