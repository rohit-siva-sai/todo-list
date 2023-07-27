import React, { useEffect, useMemo, useRef, useState } from "react";
import Task from "./task";
import { useStore } from "@/useStore/store";

const Column = ({ state }) => {
  const tasks = useStore(
    (store) => store.tasks.filter((tasks) => tasks.state == state)
    // store.tasks
  );
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  return (
    <>
      <div
        className={`min-h-[500px] w-full md:w-[33%] text-center flex flex-col space-y-2 rounded-md mx-0 md:my-0 my-6 md:m-4 p-2 bg-gray-700 font-semibold text-white text-xl border-4 border-transparent  ${
          drop ? "border-4 border-dashed  border-white " : ""
        }`}
        onDragOver={(e) => {
          setDrop(true);
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          setDrop(false);
          e.preventDefault();
        }}
        onDrop={(e) => {
          setDrop(false);
          moveTask(draggedTask, state);
          setDraggedTask(null);
        }}
      >
        <div className="flex justify-between px-4 pb-4">
          <p>{state}</p>
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black text-sm px-2 hover:bg-gray-300 hover:shadow-md shadow-white p-1 rounded-lg"
          >
            Add
          </button>
        </div>
        {tasks.map((item) => {
          return <Task key={item.title} title={item.title} />;
        })}
      </div>

      {open && (
        <div className="absolute bg-black/70 w-[100%] h-[100%] top-0 left-0">
          <div className="bg-white absolute  rounded-lg p-4 top-[50%]  flex space-x-4 left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <input
              type="text"
              name=""
              onChange={(e) => setText(e.target.value)}
              value={text}
              id=""
              className="border px-2 w-72 py-2"
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
              className="bg-white text-black text-sm px-2 border-2 hover:bg-gray-300 shadow-md p-1 rounded-lg "
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

function RefTest() {
  const ref = useRef();

  useEffect(() => {
    useStore.subscribe(
      (store) => store.tasks,
      (tasks) => {
        ref.current = tasks;
      }
    );
  }, []);

  return ref.current;
}

export default Column;
