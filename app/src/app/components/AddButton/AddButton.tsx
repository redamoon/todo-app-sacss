'use client';

import React, { useState } from 'react';

const AddTaskButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/todo/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: 'New Task Example' }), // Replace this with the desired task payload
      });

      if (!response.ok) {
        throw new Error('Failed to post task');
      }

      console.log('Task successfully added!');
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      disabled={loading}
    >
      {loading ? 'Loading...' : '追加'}
    </button>
  );
};

export default AddTaskButton;