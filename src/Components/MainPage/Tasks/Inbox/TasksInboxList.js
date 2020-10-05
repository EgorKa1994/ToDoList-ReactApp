import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TaskList } from '../../../Common/Components/TaskList';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';
import { LanguageContext } from '../../../Common/Context/Context';

export const TasksInboxList = ({ tasks, editTask }) => {
  const { language } = useContext(LanguageContext);
  return (
    <div>
      <h2>{dictionaries[language].Inbox}</h2>
      <Link className='btn-add' to='/tasks/new'>
        <button className='addition'>{dictionaries[language].AddTask}</button>
      </Link>
      <TaskList tasks={tasks} editTask={editTask} type='inbox' />
    </div>
  );
};
