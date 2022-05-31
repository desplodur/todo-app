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
      id: nanoid(),
      task: "Cook Dinner",
      status: true,
    },
  ]);

  const createNewTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: nanoid(),
      task: event.target.taskText.value,
      status: false,
    };
    const newToDoList = [...toDoList, newTodo];
    setToDo(newToDoList);
  };

  function deleteToDo(id) {
    const myIndex = toDoList.findIndex((todo) => {
      return todo.id === id;
    });
    const newToDoList = [...toDoList];
    newToDoList.splice(myIndex, 1);
    setToDo(newToDoList);
  }

  function changeStatus(id) {
    const myIndex = toDoList.findIndex((todo) => {
      return todo.id === id;
    });
    const newToDoList = [...toDoList];
    newToDoList[myIndex].status = !toDoList[myIndex].status;
    setToDo(newToDoList);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo List</h1>
        <form onSubmit={createNewTodo}>
          <label>new ToDo:</label>
          <input name="taskText" type="text"></input>
          <button type="submit">Create a new Task</button>
        </form>
      </header>
      <main>
        {toDoList.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              taskProp={todo.task}
              statusProp={todo.status}
              changeStatus={() => {
                changeStatus(todo.id);
              }}
              deleteToDo={() => {
                deleteToDo(todo.id);
              }}
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;
