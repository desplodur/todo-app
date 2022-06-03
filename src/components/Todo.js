import styled from "styled-components";

function Todo({
  taskProp,
  statusProp,
  archiveProp,
  changeStatus,
  deleteOrArchive,
}) {
  return (
    <ToDoCard status={statusProp}>
      <Task>{taskProp}</Task>
      <input type="text" placeholder={taskProp}></input>
      {archiveProp ? null : (
        <>
          <Button onClick={changeStatus}>
            {statusProp ? "complete" : "uncomplete"}
          </Button>
          {statusProp ? <Button>Edit</Button> : null}
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
