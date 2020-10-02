import React from 'react';

export const ProjectContext = React.createContext();
export const ProjectProvider = ProjectContext.Provider;

export const TaskContext = React.createContext();
export const TaskProvider = TaskContext.Provider;

export const UserContext = React.createContext();
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
