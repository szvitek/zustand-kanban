import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/*
  extras:
  - methods can be async
  - use immer (mutate state logic in place)
    set(
      produce((store) => {
        store.tasks.push({ title, state })
      })
  - subscribe
  )
*/

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, state) =>
    set(
      (store) => ({ tasks: [...store.tasks, { title, state }] }),
      false, // replace whole store, or just manipulate the current one
      'addTask' // label
    ),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  log(persist(devtools(store), { name: 'store' }))
);
