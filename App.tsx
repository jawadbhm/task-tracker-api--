import React, { useState, useCallback } from 'react';
import { Task } from './types';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskModal from './components/EditTaskModal';
import { TaskIcon } from './components/Icons';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleAddTask = useCallback((title: string, description: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            description,
            completed: false,
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
    }, []);

    const handleToggleTask = useCallback((id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }, []);

    const handleDeleteTask = useCallback((id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }, []);

    const handleUpdateTask = useCallback((updatedTask: Task) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
        setEditingTask(null);
    }, []);

    const openEditModal = (task: Task) => {
        setEditingTask(task);
    };

    const closeEditModal = () => {
        setEditingTask(null);
    };
    
    return (
        <div className="min-h-screen bg-primary font-sans">
            <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex items-center gap-4 mb-8">
                    <div className="bg-highlight p-3 rounded-full">
                        <TaskIcon />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-text-main tracking-tight">Task Tracker</h1>
                        <p className="text-text-secondary mt-1">Stay organized and productive.</p>
                    </div>
                </header>
                
                <div className="bg-secondary p-6 rounded-2xl shadow-lg mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-text-main">Add a New Task</h2>
                    <AddTaskForm onAddTask={handleAddTask} />
                </div>

                <div className="bg-secondary p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-text-main">Your Tasks</h2>
                    <TaskList
                        tasks={tasks}
                        onToggleTask={handleToggleTask}
                        onDeleteTask={handleDeleteTask}
                        onEditTask={openEditModal}
                    />
                </div>
            </main>
            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onSave={handleUpdateTask}
                    onClose={closeEditModal}
                />
            )}
        </div>
    );
};

export default App;
