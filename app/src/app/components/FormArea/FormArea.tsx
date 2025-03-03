'use client';

import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
}

interface TaskProps {
  initialTasks: Task[];
  userId?: number;
}

const TaskComponent: React.FC<TaskProps> = ({ initialTasks, userId }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!newTask.trim()) return; // Prevent empty submissions

    try {
      const response = await fetch(`http://localhost:3001/api/todo/task?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTask }), // Submit the new task text
      });

      if (!response.ok) {
        throw new Error('Failed to post task');
      }

      const createdTask = await response.json(); // Assume the API returns the created task, including `id` and `text`

      setTasks((prevTasks) => [...prevTasks, createdTask]); // Append the new task to the list
      setNewTask(''); // Clear the input field after successful submission

      console.log('Task successfully added!');
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/todo/task`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      console.log('Task successfully deleted!');

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }

  };

  return (
    <div>
      <form className="w-full max-w-md flex gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleInputChange}
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          追加
        </button>
      </form>

      {tasks.length !== 0 && (
        <ul className="w-full max-w-md flex flex-col gap-2 mt-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded dark:bg-gray-800">
              <span>{task.text}</span>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskComponent;