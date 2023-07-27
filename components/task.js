import React from "react";
import styles from "../styles/Task.module.css";
import classNames from "classnames";
import { useStore } from "@/useStore/store";
import { FaTrashAlt } from "react-icons/fa";

const STATUS = "ongoing";
const Task = ({ title }) => {
  const task = useStore((store) =>
    store.tasks.find((tasks) => tasks.title === title)
  );
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  return (
    <div
      className="bg-white flex flex-col justify-between rounded-lg cursor-move h-20 text-black py-1"
      draggable
      onDragStart={(e) => {setDraggedTask(task.title)}}
    >
      <div className="text-start px-8"> {task.title}</div>
      <div className="flex justify-between px-4 ">
        <div className="px-4 cursor-pointer" onClick={() => deleteTask(title)}>
          <FaTrashAlt />
        </div>
        <div
          className={`${styles.status}  ${
            task.state === "done"
              ? styles.done
              : task.state === "ongoing"
              ? styles.ongoing
              : styles.planned
          }`}
        >
          {task.state}
        </div>
      </div>
    </div>
  );
};

export default Task;
