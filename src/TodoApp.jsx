// src/TodoApp.jsx
import React, { useState, useEffect } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;
    if (filter === 'completed') {
      filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
      filteredTasks = tasks.filter(task => !task.completed);
    }
    return filteredTasks;
  };

  const getSortedTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (sort === 'asc') {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    });
  };

  const displayedTasks = getSortedTasks(getFilteredTasks());

  return (
    <div className="todo-app">
      <h1 className="title">To-Do List</h1>
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="task-input"
        />
        <button type="submit" className="add-task-button">Add Task</button>
      </form>

      <div className="filters">
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange} className="filter-select">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>

        <label>
          Sort:
          <select value={sort} onChange={handleSortChange} className="sort-select">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <ul className="task-list">
        {displayedTasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span
              onClick={() => handleToggleTaskCompletion(index)}
            >
              {task.text}
            </span>
            <button onClick={() => handleRemoveTask(index)} className="remove-task-button">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
