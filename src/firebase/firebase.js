import { useEffect, useState, useContext } from 'react';
import { toObject, firestore, auth } from '../firebase/firestore';
import { UserContext } from '../Components/Common/Context/Context';

export const useFirebaseTasks = () => {
  const [isLoadingTasks, setLoadingTasks] = useState(true);
  const [errorLoadingTasks, setErrorLoadingTasks] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      firestore
        .collection('/tasks')
        .where('userId', '==', user.uid)
        .get()
        .then((snapshot) => snapshot.docs.map(toObject))
        .then((tasks) => {
          setTasks(tasks);
        })
        .catch((error) => setErrorLoadingTasks(error))
        .finally(setLoadingTasks(false));
    } else {
      setLoadingTasks(false);
    }
  }, [user]);

  const addTask = async (obj) => {
    const newTask = await firestore.collection('/tasks').add(obj);
    setTasks([...tasks, { ...obj, id: newTask.id }]);
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
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      firestore
        .collection('/projects')
        .where('userId', '==', user.uid)
        .get()
        .then((snapshot) => snapshot.docs.map(toObject))
        .then((projects) => {
          setProjects(projects);
        })
        .catch((error) => setErrorLoadingProjects(error))
        .finally(setLoadingProjects(false));
    } else {
      setLoadingProjects(false);
    }
  }, [user]);

  const addProject = async (obj) => {
    const newProject = await firestore.collection('/projects').add(obj);
    setProjects([...projects, { ...obj, id: newProject.id }]);
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

  const [errorLogin, setErrorLogin] = useState(null);
  const [errorRegistration, setErrorRegistration] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(
      (user) => {
        setUser(user ? user : null);
        setLoadingUser(false);
      },
      (error) => {
        setErrorLoadingUser(error);
      }
    );
  }, []);

  const register = ({ email, password }) =>
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setErrorLogin(null);
        setErrorRegistration(null);
      })
      .catch((error) => {
        setErrorRegistration(error.message);
      });

  const logIn = ({ email, password }) =>
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setErrorLogin(null);
        setErrorRegistration(null);
      })
      .catch((error) => setErrorLogin(error.message));

  const logOut = () => {
    auth.signOut();
  };

  const changeErrorRegistration = () => {
    setErrorRegistration(null);
  };

  const changeErrorLogin = () => {
    setErrorLogin(null);
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
    changeErrorRegistration,
    changeErrorLogin,
    errorLogin,
    errorRegistration,
  };
};
