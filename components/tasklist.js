"use client";
import React from "react";
import TaskItem from "./taskitem";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";


const Tasklist = () => {
  const [text, setText] = React.useState("");
  const [tasks, updateTasks] = React.useState([]);
  const { status } = useSession();

  const getTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();

        updateTasks(
          data.map((task) => {
            return {
              text: task.name,
              checked: task.checked,
              id: task.id,
            };
          })
        );
      }
    } catch (e) {
      ("error when fetching list of tasks");
    }
  };

  const addTask = async (text) => {
    const newTask = {
      text,
      checked: false,
      id: Date.now(),
    };
    updateTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
  };

  const handleDeleteTask = async (event) => {
    const IDToDelete = event.target.dataset.deleteid;

    updateTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== Number(IDToDelete));
    });

    if (status === "authenticated") {
      await fetch("/api/tasks/" + IDToDelete, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    try {
      addTask(text);
      setText("");
      if (status === "authenticated") {
        await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: text }),
        });
      }
    } catch (e) {
      ("error when adding a task");
    }
  };

  React.useEffect(() => {
    if (status === "authenticated") {
      getTasks();
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center w-screen">
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          aria-label="Enter a new task"
          placeholder="Add a task..."
          className="bg-blue-600 text-white font-bold absolute left-1/2 -ml-36 top-16 w-96 h-11"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>

      <ul className="h-screen mt-16 w-96 ml-24">
        {tasks.length === 0 ? (
          <div className="relative border-2 border-blue-500 w-96 h-96">
            <h2 className="text-blue-600 mx-32 my-36 w-full">
              Add your first task
            </h2>
          </div>
        ) : (
          tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                text={task.text}
                id={task.id}
                checked={task.checked}
                handleDelete={handleDeleteTask}
              ></TaskItem>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Tasklist;
