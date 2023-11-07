
// TodoApp.js

import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import {FaEdit} from 'react-icons/fa';
import {BiEdit} from 'react-icons/bi';

import {GiCheckMark} from 'react-icons/gi';
import {AiOutlinePlus} from 'react-icons/ai';
import './App.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTodoText, setUpdatedTodoText] = useState('');

  useEffect(() => {
    // Fetch todos from the backend when the component mounts
    fetch('/api/todos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
        // Handle the error, e.g., display an error message to the user
      });
  }, []);

  const addTodo = () => {
    // Send a POST request to create a new todo
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodo }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo('');
      })
      .catch((error) => {
        console.error('Error creating todo:', error);
        // Handle the error, e.g., display an error message to the user
      });
  };

  const toggleTodo = (id) => {
    // Send a PUT request to update the completed status of a todo
    fetch(`/api/todos/${id}`, {
      method: 'PUT',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTodos(
          todos.map((todo) => (todo._id === id ? data : todo))
        );
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
        // Handle the error, e.g., display an error message to the user
        console.log(error.message);
      });
  };

  const deleteTodo = (id) => {
    // Send a DELETE request to delete a todo
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .then(() => {
        // Remove the deleted todo from the state
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
        // Handle the error, e.g., display an error message to the user
      });
  };

  const handleUpdateClick = (todo) => {
    setEditingTodo(todo);
    setUpdatedTodoText(todo.text);
  };

  const updateTodo = () => {
    // Send a PUT request to update the text of a todo
    fetch(`/api/todos/${editingTodo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: updatedTodoText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTodos(
          todos.map((todo) => (todo._id === data._id ? { ...todo, text: data.text } : todo))
        );
        setEditingTodo(null);
        setUpdatedTodoText('');
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
        // Handle the error, e.g., display an error message to the user
      });
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}> <div className='add-button'><AiOutlinePlus/></div> </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id}>
            {editingTodo === todo ? (
              <>
                <input
                  type="text"
                  value={updatedTodoText}
                  onChange={(e) => setUpdatedTodoText(e.target.value)}
                />
                <button className="update-button-check" onClick={updateTodo}>
                  <GiCheckMark/>
                </button>
              </>
            ) : (
              <>
                <span
                  className={todo.completed ? 'completed' : ''}
                  onClick={() => toggleTodo(todo._id)}
                >
                  {todo.text}
                </span>
                <span className="timestamp">
                  Created: {new Date(todo.timestamp).toLocaleString()}
                </span>
                <div className='btn-container'>
                  <button className="update-button" onClick={() => handleUpdateClick(todo)}>
                    <BiEdit/>
                  </button>
                  <button className="delete-button" onClick={() => deleteTodo(todo._id)}>
                    <MdOutlineDelete />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;

