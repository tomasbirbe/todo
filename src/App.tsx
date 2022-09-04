import React, { ChangeEvent, useState } from "react";
import { v4 } from "uuid";

interface Task {
  content: string;
  id: string;
  isDone: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTasks((prevState) => [...prevState, { content: newTask, id: v4(), isDone: false }]);
    setNewTask("");
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCheck(task: Task) {
    const updatedTask = tasks.map((a: Task) => {
      if (task.id === a.id) {
        a.isDone = !a.isDone;
      }

      return a;
    });

    setTasks(updatedTask);
  }

  return (
    <div className="App grid place-items-center">
      <div className="pt-4 flex flex-col gap-4">
        <form className="flex gap-5" onSubmit={handleSubmit}>
          <input
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
              <li className={`${task.isDone ? "line-through" : ""}`}>{task.content}</li>
              <input type="checkbox" onChange={() => handleCheck(task)} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
