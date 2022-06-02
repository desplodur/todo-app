import "./App.css";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Routes, Route, NavLink } from "react-router-dom";
import { func } from "prop-types";

function App() {
  const [toDoList, setToDo] = useState(
    JSON.parse(localStorage.getItem("todos"))

    /*[
    {
      id: nanoid(),
      task: "Do React Exercise",
      status: false,
      isArchived: false,
    },
    {
      id: nanoid(),
      task: "Feed the dog",
      status: true,
      isArchived: false,
    },
    {
      id: nanoid(),
      task: "Go running",
      status: false,
      isArchived: false,
    },
    {
      id: nanoid(),
      task: "Cook Dinner",
      status: true,
      isArchived: false,
    },
  ]*/
  );
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoList));
  });

  const [randomTodo, setRandomTodo] = useState(randomTodoFunction());

  function randomTodoFunction() {
    const filteredArray = toDoList.filter((todo) => {
      return todo.isArchived === false;
    });
    return filteredArray[Math.floor(Math.random() * filteredArray.length)];
  }

  const createNewTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: nanoid(),
      task: event.target.taskText.value,
      status: true,
      isArchived: false,
    };
    const newToDoList = [...toDoList, newTodo];
    setToDo(newToDoList);
  };

  function deleteOrArchive(id) {
    const myIndex = toDoList.findIndex((todo) => {
      return todo.id === id;
    });
    const newToDoList = [...toDoList];
    if (newToDoList[myIndex].status) {
      newToDoList.splice(myIndex, 1);
      setToDo(newToDoList);
    } else {
      newToDoList[myIndex].isArchived = !toDoList[myIndex].isArchived;
      setToDo(newToDoList);
    }
  }

  function changeStatus(id) {
    const newToDoList = toDoList.map((todo) => {
      if (id === todo.id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    });
    setToDo(newToDoList);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo List</h1>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <form onSubmit={createNewTodo}>
                <label>new ToDo:</label>
                <input name="taskText" type="text"></input>
                <button type="submit">Create a new Task</button>
              </form>
              {toDoList
                .filter((todo) => !todo.isArchived)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      id={todo.id}
                      taskProp={todo.task}
                      statusProp={todo.status}
                      archiveProp={todo.isArchived}
                      changeStatus={() => {
                        changeStatus(todo.id);
                      }}
                      deleteOrArchive={() => {
                        deleteOrArchive(todo.id);
                      }}
                    />
                  );
                })}
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              {toDoList
                .filter((todo) => todo.isArchived)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      id={todo.id}
                      taskProp={todo.task}
                      statusProp={todo.status}
                      archiveProp={todo.isArchived}
                      changeStatus={() => {
                        changeStatus(todo.id);
                      }}
                      deleteOrArchive={() => {
                        deleteOrArchive(todo.id);
                      }}
                    />
                  );
                })}
            </>
          }
        />
        <Route
          path="/random"
          element={
            <>
              <p>Your Random Todo is:</p>
              <button
                onClick={() => {
                  setRandomTodo(randomTodoFunction());
                }}
              >
                Shuffle
              </button>
              <Todo
                key={randomTodo.id}
                id={randomTodo.id}
                taskProp={randomTodo.task}
                statusProp={randomTodo.status}
                archiveProp={randomTodo.isArchived}
                changeStatus={() => {
                  changeStatus(randomTodo.id);
                }}
                deleteOrArchive={() => {
                  deleteOrArchive(randomTodo.id);
                }}
              />
            </>
          }
        />
      </Routes>
      <footer>
        <NavLink className="navLink" to="/">
          Home
        </NavLink>
        <NavLink className="navLink" to="/favorites">
          Favorites
        </NavLink>
        <NavLink className="navLink" to="/random">
          Random
        </NavLink>
      </footer>
    </div>
  );
}

export default App;
