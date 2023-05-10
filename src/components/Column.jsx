import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import { shallow } from 'zustand/shallow';

const Column = ({ state }) => {
  /*
    .filter() always returns a new array, and on task change always triggers a re-render
    even if the current tasks have not changed

    - we can use useMemo():
    const tasks = useStore(
      (store) => store.tasks
    )
    const filtered = useMemo(
      () => tasks.filter((task) => task.state === state),
      [tasks, state]
    )
    
    - or we can pass a comparison function like shallow
  */
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );

  return (
    <div className="column">
      <p>{state}</p>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
    </div>
  );
};
export default Column;
