import React, { useEffect, useState } from 'react';
import { toObject, firestore } from '../firebase/firestore';

export const useFirebaseTasks = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    firestore
      .collection('/tasks')
      .get()
      .then((snapshot) => snapshot.docs.map(toObject))
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((error) => setError(error))
      .finally(setLoading(false));
  }, []);

  const add = async (obj) => {
    const newTask = await firestore.collection('/tasks').add(obj);
    setTasks([...tasks, { ...obj, id: newTask.id }]);
  };

  const edit = async (taskId, obj) => {
    const editTask = await firestore
      .collection('/tasks')
      .doc(taskId)
      .update(obj);

    const index = tasks.findIndex((task) => task.id == taskId);

    setTasks([
      ...tasks.slice(0, index),
      { ...obj, id: taskId },
      ...tasks.slice(index + 1),
    ]);
  };

  const remove = async (taskId) => {
    await firestore.collection('/tasks').doc(taskId).delete();
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return { tasks, isLoading, error, add, edit, remove };
};

export const useFirebaseProjects = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore
      .collection('/projects')
      .get()
      .then((snapshot) => snapshot.docs.map(toObject))
      .then((projects) => {
        setProjects(projects);
      })
      .catch((error) => setError(error))
      .finally(setLoading(false));
  }, []);

  const add = async (obj) => {
    const newProject = await firestore.collection('/projects').add(obj);
    setProjects([...projects, { ...obj, id: newProject.id }]);
  };

  const remove = async (projectId) => {
    await firestore.collection('/projects').doc(projectId).delete();
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const edit = async (projectId, obj) => {
    const editProject = await firestore
      .collection('/projects')
      .doc(projectId)
      .update(obj);

    const index = projects.findIndex((project) => project.id == projectId);

    setProjects([
      ...projects.slice(0, index),
      { ...obj, id: projectId },
      ...projects.slice(index + 1),
    ]);
  };

  return { projects, isLoading, error, add, remove, edit };
};
