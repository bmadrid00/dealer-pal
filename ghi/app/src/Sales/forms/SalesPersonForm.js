// Import the 'useState' and 'useEffect' hooks from the 'react' library
import React, { useState, useEffect } from 'react';

// Create a functional component called 'TodoList'
function TodoList() {
  // Declare a state variable called 'todos' using the 'useState' hook
  const [todos, setTodos] = useState([]);

  // Define a function to fetch the todo items from the API endpoint using the 'fetch' function and update the 'todos' state variable using the 'setTodos' function
  const getTodos = async () => {
    // Define the URL for the todo items API endpoint
    const url = 'http://localhost:8090/api/todos/';

    // Use the 'fetch' function to make a GET request to the API endpoint
    const response = await fetch(url);

    // If the response is OK, extract the data from the response body and update the 'todos' state variable using the 'setTodos' function
    if (response.ok) {
      const data = await response.json();
      setTodos(data.todos);
    }
  };

  // Use the 'useEffect' hook to fetch the todo items from the API endpoint when the component mounts
  useEffect(() => {
    getTodos();
  }, []);

  // Define a function to handle the deletion of a todo item using the 'fetch' function and the 'setTodos' function
  const handleDelete = async (id) => {
    // Define the URL for the todo item API endpoint with the specific ID to be deleted
    const url = `http://localhost:8090/api/todos/${id}`;

    // Define the fetch configuration object
    const fetchConfig = {
      method: "DELETE",
    }

    // Use the 'fetch' function to make a DELETE request to the API endpoint
    const response = await fetch(url, fetchConfig);

    // If the response is OK, remove the todo item with the specified ID from the 'todos' state variable using the 'setTodos' function
    if (response.ok) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  }

  // Render the list of todo items using JSX
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.task} - <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// Export the 'TodoList' component
export default TodoList;
