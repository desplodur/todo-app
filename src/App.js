import "./App.css";
import Todo from "./components/Todo";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [toDoList, setToDo] = useState([
    {
      id: nanoid(),
      task: "Do React Exercise",
      status: false,
    },
    {
      id: nanoid(),
      task: "Feed the dog",
      status: true,
    },
    {
      id: nanoid(),
      task: "Go running",
      status: false,
    },
    {
      task: "Cook Dinner",
      status: true,
    },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo List</h1>
        <form>
          <label>new ToDo:</label>
          <input type="text"></input>
          <button type="submit">Create a new Task</button>
        </form>
      </header>
      <main>
        {toDoList.map((todo) => {
          return (
            <Todo key={todo.id} taskProp={todo.task} statusProp={todo.status} />
          );
        })}
      </main>
    </div>
  );
}

export default App;
