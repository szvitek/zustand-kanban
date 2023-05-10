import { useState } from 'react';
import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import { shallow } from 'zustand/shallow';

const Column = ({ state }) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

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

  const addTask = useStore((store) => store.addTask);

  return (
    <div className="column">
      <div className="titleWrapper">
        <p>{state}</p>
        <button
          onClick={() => {
            setOpen(true);
            // addTask('asffasd' + state, state);
          }}
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText('');
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Column;
