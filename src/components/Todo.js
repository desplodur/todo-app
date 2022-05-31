import styled from "styled-components";

function Todo({ id, taskProp, statusProp, changeStatus, deleteToDo }) {
  return (
    <ToDoCard status={statusProp}>
      <Task>{taskProp}</Task>
      <p>{id}</p>
      <Button onClick={changeStatus}>
        {statusProp ? "complete" : "uncomplete"}
      </Button>
      <Button onClick={deleteToDo}>{statusProp ? "delete" : "archive"}</Button>
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