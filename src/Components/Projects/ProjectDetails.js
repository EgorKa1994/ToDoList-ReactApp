import React, { useState, useEffect, Component } from 'react';
import { useFirebaseTasks } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import '../../Stylesheets/style.scss';

export const ProjectDetails = ({ project }) => {
  const { tasks, isLoading, error, editTask } = useFirebaseTasks();

  if (isLoading) {
    return (
      <>
        <h2>{project ? `${project.name}` : ''}</h2>
        <div>{project ? `${project.description}` : ''}</div>
        <div>{'....loading...'}</div>
      </>
    );
  }

  if (error) {
    return `There is ${error}`;
  }

  return (
    <div>
      <h2>{project ? `${project.name}` : ''}</h2>
      <div>{project ? `${project.description}` : ''}</div>
      <ul>
        {tasks.map((task) => {
          if (task.projectId == project.id) {
            return (
              <ProjectTask key={task.id} task={task} editTask={editTask} />
            );
          }
        })}
      </ul>
    </div>
  );
};

const ProjectTask = ({ task, editTask }) => {
  const [isDone, setIsDone] = useState(task.isDone);
  const [isFocusedOn, setIsFocusedOn] = useState(task.isFocusedOn);

  return (
    <li>
      <input
        type='checkbox'
        checked={isDone}
        onChange={async () => {
          await editTask(task.id, { ...task, isDone: isDone ? false : true });
          await setIsDone(!isDone);
        }}
      ></input>
      {task.title}
      <span
        onClick={async () => {
          await editTask(task.id, {
            ...task,
            isFocusedOn: isFocusedOn ? false : true,
          });
          await setIsFocusedOn(!isFocusedOn);
        }}
        className={isFocusedOn ? 'focused' : ''}
      >
        &#9734;
      </span>
      <Link to={`/task/${task.id}`}>подробнее о задаче</Link>
    </li>
  );
};

// class ProjectTask extends Component {
//   state = {
//     isDone: this.props.task.isDone,
//   };

//   render() {
//     return (
//       <li>
//         <input
//           type='checkbox'
//           checked={this.state.isDone}
//           onChange={async () => {
//             await this.setState({ isDone: !this.state.isDone });
//             await this.props.editTask(this.props.task.id, {
//               ...this.props.task,
//               isDone: this.state.isDone,
//             });
//           }}
//         ></input>
//         {this.props.task.title}
//         <Link to={`/task/${this.props.task.id}`}>подробнее о задаче</Link>
//       </li>
//     );
//   }
// }
