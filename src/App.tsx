import React, { ChangeEvent, useRef, useState } from "react";
import { v4 } from "uuid";

interface Task {
  content: string;
  id: string;
  isDone: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [editInput, setEditInput] = useState<string>("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTasks((prevState) => [...prevState, { content: newTask, id: v4(), isDone: false }]);
    setNewTask("");
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCheck(task: Task) {
    const updatedTasks = tasks.map((a: Task) => {
      if (task.id === a.id) {
        a.isDone = !a.isDone;
      }

      return a;
    });

    setTasks(updatedTasks);
  }

  function handleDelete(task: Task) {
    const updatedTasks = tasks.filter((taskItem: Task) => taskItem.id !== task.id);

    setTasks(updatedTasks);
  }

  function handleEdit(task: Task) {
    setTaskToEdit(task);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditInput(event.target.value);
  }

  return (
    <div className="App grid place-items-center">
      <div className="pt-4 flex flex-col gap-4">
        <form className="flex gap-5" onSubmit={handleSubmit}>
          <input
            required
            className="border border-black p-2 rounded-md"
            placeholder="Creá una nueva tarea"
            type="text"
            value={newTask}
            onChange={handleInput}
          />
          <button className="border border-black px-2 rounded-md" type="submit">
            Crear
          </button>
        </form>
        <ul>
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between px-2">
              {taskToEdit?.id !== task.id ? (
                <li className={`${task.isDone ? "line-through text-gray-900/40" : ""}`}>
                  {task.content}
                </li>
              ) : (
                <input defaultValue={task.content} onChange={handleChange} />
              )}

              <div className="flex gap-8 ">
                <input type="checkbox" onChange={() => handleCheck(task)} />
                <button onClick={() => handleEdit(task)}>edit</button>
                <button onClick={() => handleDelete(task)}>x</button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
