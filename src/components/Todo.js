import styled from "styled-components";
import { useState } from "react";
import Form from "./Form";

function Todo({
  taskProp,
  statusProp,
  archiveProp,
  changeStatus,
  deleteOrArchive,
  editTodo,
}) {
  const [editBool, setEditBool] = useState(true);
  return (
    <ToDoCard status={statusProp}>
      {editBool ? <Task>{taskProp}</Task> : <Form initialFunction={editTodo} />}{" "}
      {archiveProp ? null : (
        <>
          <Button
            onClick={() => {
              changeStatus();
              if (!editBool) {
                setEditBool(!editBool);
              }
            }}
          >
            {statusProp ? "complete" : "uncomplete"}
          </Button>
          {statusProp ? (
            <Button
              onClick={() => {
                setEditBool(!editBool);
              }}
            >
              Edit
            </Button>
          ) : null}
          <Button onClick={deleteOrArchive}>
            {statusProp ? "delete" : "archive"}
          </Button>
        </>
      )}
    </ToDoCard>
  );
}

export default Todo;

const Task = styled.h1`
  font-size: 1.5rem;
`;
const Button = styled.button`
  background-color: #282c34;
  color: white;
  border: none;
  height: 3em;
  margin 0 1em 0 1em
`;

const ToDoCard = styled.article`
  background-color: ${(props) => (props.status === true ? "red" : "green")};
`;
/** */
