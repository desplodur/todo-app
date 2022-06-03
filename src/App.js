import "./App.css";
import Todo from "./components/Todo";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Routes, Route, NavLink } from "react-router-dom";

function App() {
  const [toDoList, setToDo] = useState(() => {
    const localStorageTodolist = localStorage.getItem("todos");
    if (localStorageTodolist) {
      return JSON.parse(localStorageTodolist);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoList));
  }, []);

  const [randomTodo, setRandomTodo] = useState(randomTodoFunction());

  function randomTodoFunction() {
    return toDoList[Math.floor(Math.random() * toDoList.length)];
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
              <Form createNewTodo={createNewTodo} />
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
              {randomTodo ? (
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
              ) : (
                "No Todos defined"
              )}
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
        <NavLink
          className="navLink"
          onClick={() => {
            setRandomTodo(randomTodoFunction());
          }}
          to="/random"
        >
          Random
        </NavLink>
      </footer>
    </div>
  );
}

export default App;
