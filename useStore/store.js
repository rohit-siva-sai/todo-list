import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  tasksInOngoing: 0,
  addTask: async (title, state) =>
    // set(
    //   (store) => ({ tasks: [...store.tasks, { title, state }] }),
    //   false,
    //   "addTask"
    // ),
    set(
      produce((store) => {
        store.tasks.push({ title, state });
      }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title != title),
    })),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, state) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state } : task
        ),
      }),
      false,
      "moveTask"
    ),
});

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      // console.log("args", args);

      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  subscribeWithSelector(log(persist(devtools(store), { name: "store" })))
);

useStore.subscribe(
    (store=> store.tasks),
    (newTaks, prevTasks) => {
        useStore.setState({
      tasksInOngoing: newTaks.filter((task) => task.state === "ongoing")
        .length,
    });
 
});
