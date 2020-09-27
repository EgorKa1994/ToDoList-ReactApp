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
