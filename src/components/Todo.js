function Todo({ taskProp, statusProp }) {
  return (
    <div>
      <h1>{taskProp}</h1>
      <button>complete/uncomplete</button>
      <button>delete/archive</button>
    </div>
  );
}

export default Todo;
