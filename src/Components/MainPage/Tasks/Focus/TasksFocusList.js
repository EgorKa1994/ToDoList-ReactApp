import React, { useContext } from 'react';
import { TaskList } from '../../../Common/Components/TaskList';
import { dictionaries } from '../../../../Dictionaries/Dictionaries';
import { LanguageContext } from '../../../Common/Context/Context';

export const TasksFocusList = ({ tasks }) => {
  const { language } = useContext(LanguageContext);
  return (
    <div>
      <h2>{dictionaries[language].Focus}</h2>
      <TaskList tasks={tasks} type='focus' />
    </div>
  );
};
