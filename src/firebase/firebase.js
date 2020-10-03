import { useEffect, useState } from 'react';
import { toObject, firestore, auth } from '../firebase/firestore';

export const useFirebaseTasks = () => {
  const [isLoadingTasks, setLoadingTasks] = useState(true);
  const [errorLoadingTasks, setErrorLoadingTasks] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    firestore
      .collection('/tasks')
      .get()
      .then((snapshot) => snapshot.docs.map(toObject))
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((error) => setErrorLoadingTasks(error))
      .finally(setLoadingTasks(false));
  }, []);

  const addTask = async (obj) => {
    const newTask = await firestore.collection('/tasks').add(obj);
    setTasks([...tasks, { ...obj }]);
  };

  const editTask = async (taskId, obj) => {
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

  const removeTask = async (taskId) => {
    await firestore.collection('/tasks').doc(taskId).delete();
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return {
    tasks,
    isLoadingTasks,
    errorLoadingTasks,
    addTask,
    editTask,
    removeTask,
  };
};

////////////////////////////////////////////////

export const useFirebaseProjects = () => {
  const [isLoadingProjects, setLoadingProjects] = useState(true);
  const [errorLoadingProjects, setErrorLoadingProjects] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore
      .collection('/projects')
      .get()
      .then((snapshot) => snapshot.docs.map(toObject))
      .then((projects) => {
        setProjects(projects);
      })
      .catch((error) => setErrorLoadingProjects(error))
      .finally(setLoadingProjects(false));
  }, []);

  const addProject = async (obj) => {
    const newProject = await firestore.collection('/projects').add(obj);
    setProjects([...projects, { ...obj }]);
  };

  const removeProject = async (projectId) => {
    await firestore.collection('/projects').doc(projectId).delete();
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const editProject = async (projectId, obj) => {
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

  return {
    projects,
    isLoadingProjects,
    errorLoadingProjects,
    addProject,
    removeProject,
    editProject,
  };
};

////////////////////////////////////////////

export const useFirebaseUser = () => {
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [errorLoadingUser, setErrorLoadingUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listenUser = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setLoadingUser(false);
      },
      (error) => {
        setErrorLoadingUser(error);
      }
    );
    return listenUser;
  }, []);

  const register = ({ email, password }) =>
    auth.createUserWithEmailAndPassword(email, password);

  const logIn = ({ email, password }) =>
    auth.signInWithEmailAndPassword(email, password);

  const logOut = () => {
    auth.signOut();
  };

  const update = ({ displayName }) => {
    user.updateProfile({ displayName: displayName });
    setUser({ ...user, displayName });
  };

  return {
    user,
    isLoadingUser,
    errorLoadingUser,
    register,
    logIn,
    logOut,
    update,
  };
};
