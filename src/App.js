import React, { useEffect, useState } from 'react';
import { Menu } from './Menu/Menu';
import { Header } from './Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { TasksPage } from './Components/Tasks/Inbox/TaskPage';

////////////////////////////////////////projects////

const Projects = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   firestore
  //     .collection('/tasks')
  //     .get()
  //     .then((snapshot) => snapshot.docs.map(toObject))
  //     .then((tasks) => {
  //       setTasks(tasks);
  //     })
  //     .catch((error) => setError(error))
  //     .finally(setLoading(false));
  // }, [tasks]);

  // if (isLoading) {
  //   return '...Loading...';
  // }

  // if (error) {
  //   return `There is error ${error}`;
  // }

  return (
    <div>
      <h2>Projects</h2>
      <button>Add project</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Menu />
        <TasksPage />
      </BrowserRouter>
    </>
  );
};
