import React, { useState } from 'react';

interface AddTaskFormProps {
    onAddTask: (title: string, description: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAddTask(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="sr-only">Task Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title (e.g., Learn React Hooks)"
                    className="w-full px-4 py-2 rounded-md bg-accent text-text-main placeholder-text-secondary border border-transparent focus:outline-none focus:ring-2 focus:ring-highlight"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="sr-only">Task Description</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                    className="w-full px-4 py-2 rounded-md bg-accent text-text-main placeholder-text-secondary border border-transparent focus:outline-none focus:ring-2 focus:ring-highlight"
                />
            </div>
            <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-highlight text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 focus:ring-offset-secondary transition-colors duration-200"
            >
                Add Task
            </button>
        </form>
    );
};

export default AddTaskForm;
