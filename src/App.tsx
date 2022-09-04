import React, { useState } from "react";

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTasks((prevState) => [...prevState, newTask]);
    setNewTask("");
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  return (
    <div className="App grid place-items-center h-full">
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={Math.random() * 100000}>{task}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            className="border border-black"
            type="text"
            value={newTask}
            onChange={handleInput}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
