import styled from "styled-components";

function Form({ createNewTodo }) {
  return (
    <Formular onSubmit={createNewTodo}>
      <label>ToDo:</label>
      <input name="taskText" type="text"></input>
      <button type="submit">Submit</button>
    </Formular>
  );
}

const Formular = styled.form`
  font-size: 1.5rem;
  padding: 0em 0 1em 0;
`;

export default Form;
