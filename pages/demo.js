import Column from "@/components/column";
import React from "react";

const Demo = () => {
  return (
    <div>
      <p className="text-5xl text-center font-serif py-10 font-semibold ">Todo List</p>
      <div className="bg-gray-100  flex md:flex-row flex-col justify-center items-start italic">
        <Column state="planned" />
        <Column state="ongoing" />
        <Column state="done" />
      </div>
    </div>
  );
};

export default Demo;
