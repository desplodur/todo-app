import styled from "styled-components";

function Form({ createNewTodo }) {
  return (
    <form onSubmit={createNewTodo}>
      <label>new ToDo:</label>
      <input name="taskText" type="text"></input>
      <button type="submit">Create a new Task</button>
    </form>
  );
}

export default Form;
